import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import movie_names from "./movie_names.json";
import {
  getMovieData,
  getRecommendedMoviesData,
} from "./utils";
import recommender_api from "./api/recommenderapi";
import "./App.css";
import { Button } from "@material-ui/core";
import RowMovieCard from "./components/RowMovieCard";
import InputMovieCard from "./components/InputMovieCard";
import AboutMe from "./components/AboutMe";
import TitleCard from "./components/TitleCard";
import Loading from "./components/Loading";
import Error from "./components/Error";

function App() {
  const [movies, setMovies] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState(null);
  const [inputMovieData, setInputMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieNames = () => {
      setMovies(movie_names.movie_names);
    };

    const dummieAPIRequest = async () => {
      await recommender_api.get("/");
    };

    loadMovieNames();
    dummieAPIRequest();
  }, []);

  const onChangeHandler = (text_value) => {
    let matches = [];
    if (text_value.length > 0) {
      matches = movies.filter((movie) => {
        const regex = new RegExp(`${text}`, "gi");
        return movie.title.match(regex);
      });
    }

    if (matches.length > 10) matches = matches.slice(0, 8);

    setSuggestions(matches);
    setText(text_value);
  };

  const onSuggestHandler = (text_value) => {
    setText(text_value);
    setSuggestions(null);
  };

  const movieHandler = async (movie_name) => {
    setLoading(true);
    setError(null);

    const request = new FormData();
    request.append("movie_name", movie_name);
    request.append("number_of_recommendations", 10);

    const response = await recommender_api.post("/recommend_movie", request);

    const responseData = response.data;
    if (responseData.error) {
      setError(responseData.error);
    } else {
      const movie_data = await getMovieData(responseData.input_movie.movie_id);
      const recommendations_movie_data = await getRecommendedMoviesData(
        responseData.recommendations
      );


      setInputMovieData(movie_data);
      setRecommendedMovies(recommendations_movie_data);

      setLoading(false);
      
    }
    
    setLoading(false);
  };

  const handleClick = async () => {
    await movieHandler(text);
  };

  const handleCardClick = async (movie_name) => {
    setText(movie_name);
    await movieHandler(movie_name);
  };

  let finalComponent = null;

  if (loading) finalComponent = <Loading />;
  else if (error) {
    finalComponent = <Error error={error} />;
  } else {
    finalComponent = recommendedMovies && (
      <>
        <br />
        <br />
        <div className="recommendation_section">
          <InputMovieCard {...inputMovieData} />
          <br />
        
          <br />
          <center>
            <h1 className="title">Recommended Movies Based On Your Search</h1>
          </center>
          <br />

          <div className="cast_data_cards">
          {recommendedMovies.map((movie) => {
              return (
                <div
                  key={movie.id}
                  onClick={(e) => handleCardClick(movie.title)}
                >
                  <RowMovieCard key={movie.rank} {...movie} />
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="app">
      {/* Title */}
      <TitleCard />

      {/* Search */}
      <div className="app__search_container">
        <div className="search_wrapper">
          <input
            className="search_input"
            value={text}
            onChange={(e) => onChangeHandler(e.target.value)}
            onBlur={() => {
              setTimeout(() => {
                setSuggestions(null);
              }, 200);
            }}
            type="text"
            placeholder="Type Movie Name"
          />

          <Button
            className="search_button"
            variant="contained"
            color="primary"
            disabled={text === ""}
            startIcon={<SearchIcon />}
            onClick={() => handleClick()}
          >
            Search
          </Button>

          {suggestions && (
            <div className="suggestion_container">
              {suggestions.map((suggestion, i) => {
                return (
                  <div
                    className="suggestion"
                    onClick={() => onSuggestHandler(suggestion.title)}
                    key={i}
                  >
                    {suggestion.title}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Top Rated Movies or Movie and Recommendations */}

      {finalComponent}

      {/* About Application */}
      <br />
      <center>
        <h1 className="title about_title">About Website</h1>
      </center>
      <br />
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <div className="about_application_content">
          Welcome to WhatNEXT. This is an Machine Learning based web application in
          which you can search for any Hollywood Movie. This Website will
          provide all the information related to that movie, and also provide you the top 10 movie recommendations based on
          your search. Search for a movie for better experience.
        </div>
      </div>

      {/* About Me */}
      <br />
       <AboutMe />
    </div>
  );
}

export default App;
