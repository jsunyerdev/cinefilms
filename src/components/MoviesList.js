import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieSlide from './MovieSlide';
import Genre from './Genre';
import Carousel from 'react-bootstrap/Carousel';

export default function MoviesList() {
    const params = useParams();
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [activeIndex, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        console.log('selectedIndex: ' + selectedIndex)
        setIndex(selectedIndex);
    };
    
    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const apiKey = process.env.REACT_APP_API_KEY;
        const genresAllowed = ["Action", "Animation", "Crime", "Documentary", "Drama", "Horror", "Music", "Romance", "War", "Western"];
        let fetchString;
        fetchString = apiUrl + "trending/movie/day?api_key=" + apiKey;
        fetch(fetchString)
            .then((response) => response.json())
            .then(json => {
                setMovies(json.results);
            });
        let genresFetch = apiUrl + "genre/movie/list?api_key=" + apiKey;
        fetch(genresFetch)
            .then((response) => response.json())
            .then(json => {
                let filteredGenres = json.genres.filter(genre => 
                    genresAllowed.includes(genre.name)
                );
                setGenres(filteredGenres);
            });
    }, [params.keyword]);

    return (
        <>
            <Carousel activeIndex={activeIndex} onSelect={handleSelect} interval={null}>
                {movies.map((movie, index) =>
                    <Carousel.Item key={movie.id}>
                        <MovieSlide id={movie.id} title={movie.title} active={index === activeIndex} moreinfo={true}></MovieSlide>
                    </Carousel.Item>
                )}
            </Carousel>
            <div className="genres-collections-wrapper">
                {genres.map((genre) =>
                    <Genre key={genre.id} id={genre.id} title={genre.name}></Genre>
                )}
            </div>
        </>
    );
}