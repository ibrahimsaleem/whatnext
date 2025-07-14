# WhatNEXT - Movie Recommendation System

[![Live Demo](https://img.shields.io/badge/Live%20Demo-WhatNEXT-brightgreen)](https://whatnext-movie.web.app/)
[![Frontend](https://img.shields.io/badge/Frontend-React-blue)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Flask-red)](https://flask.palletsprojects.com/)
[![ML](https://img.shields.io/badge/ML-scikit--learn-orange)](https://scikit-learn.org/)

A machine learning-based web application that provides movie recommendations based on user search preferences. Built with React.js frontend and Flask backend, featuring content-based recommendation algorithms.

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

### Frontend (React.js)
- **Framework**: React 17
- **UI Library**: Material-UI
- **HTTP Client**: Axios
- **Deployment**: Firebase Hosting

### Backend (Python Flask)
- **Framework**: Flask
- **ML Libraries**: scikit-learn, pandas, numpy
- **NLP**: NLTK for text processing
- **External APIs**: TMDB API, YouTube API
- **Deployment**: Heroku

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
│       ├── src/
│       │   ├── components/          # React components
│       │   ├── api/                 # API configurations
│       │   └── utils.js            # Utility functions
│       └── package.json
├── API/
│   ├── app.py                      # Flask backend
│   └── final_data.csv              # Movie dataset
├── build/                          # Production build
├── firebase.json                   # Firebase config
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Python 3.7+
- npm or yarn

### Frontend Setup
```bash
cd Frontend/whatnext
npm install
npm start
```

### Backend Setup
```bash
cd API
pip install -r requirements.txt
python app.py
```

### Environment Variables
Create a `.env` file in the API directory:
```env
TMDB_API_KEY=your_tmdb_api_key_here
```

## 🔧 API Endpoints

### Movie Recommendation
- **URL**: `/recommend_movie`
- **Method**: POST
- **Parameters**:
  - `movie_name`: Name of the movie to search
  - `number_of_recommendations`: Number of recommendations (default: 10)

### Health Check
- **URL**: `/`
- **Method**: GET
- **Response**: API status confirmation

## 🚀 Deployment

### Frontend (Firebase)
```bash
cd Frontend/whatnext
npm run build
firebase deploy
```

### Backend (Heroku)
```bash
cd API
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

## 🧪 Technologies Used

### Frontend
- React.js 17
- Material-UI
- Axios
- React YouTube

### Backend
- Flask
- scikit-learn
- pandas
- numpy
- NLTK
- TMDB API

### Deployment
- Firebase Hosting
- Heroku

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

**Made with ❤️ using React, Flask, and Machine Learning**
