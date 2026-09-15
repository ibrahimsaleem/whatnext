// Client-side movie recommendation engine.
//
// This reimplements what the old Flask backend did (CountVectorizer +
// cosine similarity over `movie_feature`, plus a fuzzy title fallback and a
// TMDB id lookup) entirely in the browser, so the app no longer depends on
// a running server.

import tmdbapi from "../api/tmdbapi";

const TMDB_API_KEY = "fc2ce77413f99635655e3209989c0be7";
const DATASET_URL = `${process.env.PUBLIC_URL}/data/movie_dataset.json`;
const FUZZY_MATCH_THRESHOLD = 0.5;

let indexPromise = null;

// Mirrors sklearn's default CountVectorizer token pattern (\b\w\w+\b, lowercased).
function tokenize(text) {
  const matches = text.toLowerCase().match(/[a-z0-9]+/g);
  return matches ? matches.filter((token) => token.length >= 2) : [];
}

function buildDocument(feature) {
  const counts = new Map();
  for (const token of tokenize(feature)) {
    counts.set(token, (counts.get(token) || 0) + 1);
  }
  let sumOfSquares = 0;
  for (const count of counts.values()) sumOfSquares += count * count;
  return { counts, norm: Math.sqrt(sumOfSquares) };
}

function cosineSimilarity(docA, docB) {
  if (docA.norm === 0 || docB.norm === 0) return 0;
  const [smaller, larger] =
    docA.counts.size <= docB.counts.size ? [docA, docB] : [docB, docA];
  let dot = 0;
  for (const [token, count] of smaller.counts) {
    const otherCount = larger.counts.get(token);
    if (otherCount) dot += count * otherCount;
  }
  return dot / (docA.norm * docB.norm);
}

function bigrams(str) {
  const grams = new Map();
  for (let i = 0; i < str.length - 1; i++) {
    const gram = str.substring(i, i + 2);
    grams.set(gram, (grams.get(gram) || 0) + 1);
  }
  return grams;
}

// Dice's coefficient over character bigrams: a lightweight, dependency-free
// stand-in for difflib's fuzzy title matching.
function titleSimilarity(a, b) {
  if (a === b) return 1;
  if (a.length < 2 || b.length < 2) return 0;
  const gramsA = bigrams(a);
  const gramsB = bigrams(b);
  let intersection = 0;
  for (const [gram, count] of gramsA) {
    const otherCount = gramsB.get(gram);
    if (otherCount) intersection += Math.min(count, otherCount);
  }
  const totalGrams = a.length - 1 + (b.length - 1);
  return totalGrams === 0 ? 0 : (2 * intersection) / totalGrams;
}

function findClosestTitle(query, titles) {
  let bestIndex = -1;
  let bestScore = -1;
  for (let i = 0; i < titles.length; i++) {
    const score = titleSimilarity(query, titles[i]);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = i;
    }
  }
  return { index: bestIndex, score: bestScore };
}

async function loadIndex() {
  if (!indexPromise) {
    indexPromise = fetch(DATASET_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load movie dataset");
        return response.json();
      })
      .then((records) => {
        const titles = new Array(records.length);
        const documents = new Array(records.length);
        records.forEach((record, i) => {
          titles[i] = record.t;
          documents[i] = buildDocument(record.f);
        });
        return { titles, documents };
      })
      .catch((err) => {
        indexPromise = null; // allow retrying on next call
        throw err;
      });
  }
  return indexPromise;
}

// Warms the dataset fetch/parse ahead of the first search so the user isn't
// waiting on it when they hit "Search".
export function preloadRecommenderData() {
  loadIndex().catch(() => {});
}

async function lookupTmdbId(title) {
  const response = await tmdbapi.get("/search/movie", {
    params: { api_key: TMDB_API_KEY, query: title },
  });
  const results = response.data.results;
  if (!results || results.length === 0) throw new Error("not found on TMDB");
  return results[0].id;
}

export async function recommendMovies(movieNameRaw, numberOfRecommendations = 10) {
  const { titles, documents } = await loadIndex();
  const movieName = movieNameRaw.trim().toLowerCase();

  let matchIndex = titles.indexOf(movieName);
  if (matchIndex === -1) {
    const { index, score } = findClosestTitle(movieName, titles);
    if (index === -1 || score < FUZZY_MATCH_THRESHOLD) {
      return {
        error:
          "Sorry! Movie is not in our database. Please check the spelling or try with another movie name",
      };
    }
    matchIndex = index;
  }

  const queryDoc = documents[matchIndex];
  const ranked = titles
    .map((_, i) => [i, cosineSimilarity(queryDoc, documents[i])])
    .sort((a, b) => b[1] - a[1])
    .slice(0, numberOfRecommendations + 5)
    .map(([i]) => i);

  const result = { recommendations: [] };
  let rank = 1;

  for (const idx of ranked) {
    if (result.recommendations.length >= numberOfRecommendations) break;
    try {
      const movieId = await lookupTmdbId(titles[idx]);
      if (idx === matchIndex) {
        result.input_movie = { movie_id: movieId };
      } else {
        result.recommendations.push({ movie_id: movieId, rank });
        rank += 1;
      }
    } catch (err) {
      // Mirror the previous backend's behavior: skip titles TMDB can't resolve.
    }
  }

  if (!result.input_movie) {
    // The searched movie itself couldn't be resolved on TMDB at all.
    try {
      result.input_movie = { movie_id: await lookupTmdbId(titles[matchIndex]) };
    } catch (err) {
      return {
        error:
          "Sorry! We couldn't find that movie's details right now. Please try again.",
      };
    }
  }

  return result;
}
