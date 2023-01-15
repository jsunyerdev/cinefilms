import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from './MovieCard';

export default function MoviesList() {
    const params = useParams();
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState([]);
    
    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const apiKey = process.env.REACT_APP_API_KEY;
        let fetchString;
        if (params.keyword) {
            fetchString = apiUrl + "search/movie?api_key=" + apiKey + "&query=" + params.keyword + "&language=en-US&page=1&include_adult=false";
            setTitle("Movies with the keyword ");
            setSearchKeyword(params.keyword);
        }
        fetch(fetchString)
            .then((response) => response.json())
            .then(json => {
                let results = json.results.filter(movie => 
                    movie.id !== 'undefined'
                );
                setMovies(results);
            });
    }, [params.keyword]);

    return (
        <>
            <div className="main">
                <h1 className="fs-3 search-results-title text-secondary">{title} <span className="fw-bold text-light">{searchKeyword}</span>.</h1>
                <div className="col-sm-12" >
                    <div id="root" className="row equal">
                        {movies.map((movie, index) =>
                            <div key={movie.id} className="col-6 col-sm-6 col-md-3 col-lg-2 mb-4"> 
                                <MovieCard id={movie.id} poster={movie.poster_path} title={movie.title} type="grid"></MovieCard>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}