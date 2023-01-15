import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import MoviesList from './components/MoviesList';
import MoviesListSearchResults from './components/MoviesListSearchResults';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<MoviesList/>} />
          <Route exact path="/search/:keyword" element={<MoviesListSearchResults/>} />
          <Route exact path="/movie/:movieId" element={<MovieDetails/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
