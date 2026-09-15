# WhatNEXT - Movie Recommendation System

[![Live Demo](https://img.shields.io/badge/Live%20Demo-WhatNEXT-brightgreen)](https://whatnext-movie.web.app/)
[![Frontend](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)
[![No Backend](https://img.shields.io/badge/Backend-None%20needed-success)]()

A machine learning-based web application that provides movie recommendations based on user search preferences. The whole app — including the content-based recommendation model — runs client-side in React, with no server to deploy or keep running.

## 🌟 Features

- **Smart Movie Search**: Autocomplete functionality with fuzzy matching
- **ML-Powered Recommendations**: Content-based filtering using cosine similarity
- **Rich Movie Information**: Detailed movie data including posters, cast, and trailers
- **Responsive Design**: Modern UI built with Material-UI components
- **Real-time Suggestions**: Dynamic search suggestions as you type
- **YouTube Integration**: Movie trailers for enhanced user experience

## 🚀 Live Demo

**Visit the application**: [https://whatnext-movie.web.app/](https://whatnext-movie.web.app/)

## 📸 Screenshots

![Main Interface](https://user-images.githubusercontent.com/27896839/175828438-51e9a3a5-e495-4294-a789-8ff2361e4030.png)

![Recommendations](https://user-images.githubusercontent.com/27896839/175828532-f9a8257e-db9c-451e-9ba6-1a79d06cc335.png)

## 🏗️ Architecture

The app is now fully static and self-contained — the recommendation engine
runs entirely in the browser, so there's nothing to deploy or keep running
besides the Firebase-hosted frontend.

### Frontend (React.js)
- **Framework**: React 17
- **UI Library**: Material-UI
- **Recommendation Engine**: `src/recommender/engine.js` — a client-side
  port of the content-based filtering model (bag-of-words feature vectors +
  cosine similarity, with a fuzzy title-match fallback), running against a
  bundled dataset (`public/data/movie_dataset.json`)
- **HTTP Client**: Axios (used only for TMDB API calls)
- **Deployment**: Firebase Hosting

### Legacy Backend (Python Flask, optional)
The original `API/app.py` Flask service that used to serve
`/recommend_movie` is kept in the repo for reference but is **no longer
required** — the frontend no longer calls it. It was previously deployed to
Heroku, whose free tier has since been discontinued.

## 🧠 Machine Learning Pipeline

### Recommendation Algorithm
1. **Data Preprocessing**: Text cleaning, stop word removal, lemmatization
2. **Feature Extraction**: CountVectorizer for movie feature representation
3. **Similarity Calculation**: Cosine similarity for movie comparison
4. **Recommendation Generation**: Top 10 most similar movies

### Key Components
- Content-based filtering
- Fuzzy string matching for search
- Real-time autocomplete suggestions
- Movie metadata integration

## 📁 Project Structure

```
WhatNEXT/
├── Frontend/
│   └── whatnext/
│       ├── public/
│       │   └── data/movie_dataset.json  # Bundled movie dataset
│       ├── src/
│       │   ├── components/          # React components
│       │   ├── api/                 # TMDB API client
│       │   ├── recommender/         # Client-side recommendation engine
│       │   └── utils.js            # Utility functions
│       └── package.json
├── API/                             # Legacy Flask backend (unused, kept for reference)
│   ├── app.py
│   └── final_data.csv              # Source movie dataset
├── build/                          # Production build (deployed to Firebase)
├── firebase.json                   # Firebase config
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup
```bash
cd Frontend/whatnext
npm install
npm start
```

That's it — no backend process, database, or API key setup is needed to run
the app locally. The recommendation engine and dataset ship with the
frontend bundle.

## 🚀 Deployment

### Frontend (Firebase)
```bash
cd Frontend/whatnext
npm run build
# copy the build output to the repo-root `build/` directory that
# firebase.json's "hosting.public" points at, then:
firebase deploy
```

## 🧪 Technologies Used

### Frontend
- React.js 17
- Material-UI
- Axios
- React YouTube
- TMDB API

### Deployment
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for movie data
- [Material-UI](https://material-ui.com/) for UI components
- [scikit-learn](https://scikit-learn.org/) for ML algorithms

## 📞 Contact

For questions or support, please open an issue in this repository.

---

**Made with ❤️ using React and Machine Learning**
