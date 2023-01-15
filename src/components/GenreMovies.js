import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import Slider from "react-slick";

export default function GenreMovies(props) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const apiKey = process.env.REACT_APP_API_KEY;
        let genreMoviesFetch = apiUrl + "discover/movie?api_key=" + apiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&vote_average.gte=7.6&vote_count.gte=800&with_genres=" + props.genre;
        fetch(genreMoviesFetch)
            .then((response) => response.json())
            .then(json => {
                setMovies(json.results);
            });
    }, [props]);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 8
      };
    
    return (
        <>
            <Slider {...settings}>
                {movies.map((movie, index) =>
                    <MovieCard key={movie.id} id={movie.id} poster={movie.poster_path} title={movie.title}></MovieCard>
                )}
            </Slider>
        </>
    )
}