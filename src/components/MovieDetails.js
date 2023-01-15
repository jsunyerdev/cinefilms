import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieTrailer from './MovieTrailer';

export default function MovieDetails() {
    
    const params = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState([]);
    
    let imagesRoot = "https://image.tmdb.org/t/p/w500/";
    let apiKey = '14c091dafc9ea98679d5d2231a98589e';
    let fetchString = "https://api.themoviedb.org/3/movie/" + params.movieId + '?api_key=' + apiKey;

    useEffect(() => {
        fetch(fetchString)
            .then((response) => response.json())
            .then(json => {
                setMovie(json)
            });
    }, [fetchString]);
    
    return (
        <>
            <MovieTrailer id={movie.id} title={movie.title} poster={movie.poster_path} active={true} moreinfo={false}></MovieTrailer>
            <div className="main">
                <div className="row">
                    <div className="col-sm-12" >
                        <button onClick={() => navigate(-1)} className="btn btn-secondary mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                                <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"></path>
                            </svg>
                            Back
                        </button>
                        <div id="root" className="row equal">
                            <div className="offset-md-2 col-md-3">
                            <img src={(movie.poster_path !== undefined) ? imagesRoot + movie.poster_path : ''} className="movie-details-image card-img-top mb-2" alt="" />
                            </div>
                            <div className="col-md-5">
                                <h1 className="movie-title fs-3 mb-2 lh-sm">{movie.title}</h1>
                                <div className="mb-3">{movie.tagline}</div>
                                <span className="badge rounded-pill text-bg-dark mb-3 me-1">MOVIE</span>
                                <span id="genres">
                                    {movie.genres?.map((genre) =>
                                        <span className="card-type badge rounded-pill text-bg-warning me-1" key={genre.id}>{genre.name}</span>
                                    )}
                                </span>
                                <p id="detailDescription" className="mt-4">Deep inside the mountain of Dovre, something gigantic awakens after being trapped for a thousand years. Destroying everything in its path, the creature is fast approaching the capital of Norway. But how do you stop something you thought only existed in Norwegian folklore?</p>
                                <ul className="list-group list-group-flush">
                                    <li id="detailSeasonsWrapper" className="list-group-item d-none"><span className="fw-bold">Seasons: </span><span id="detailSeasons"></span></li>
                                    <li id="detailEpisodesWrapper" className="list-group-item d-none"><span className="fw-bold">Episodes: </span><span id="detailEpisodes"></span></li>
                                    <li id="detailStatusWrapper" className="list-group-item"><span className="fw-bold">Status: </span><span id="detailStatus">{movie.status}</span></li>
                                    <li id="detailVoteAverageWrapper" className="list-group-item"><span className="fw-bold">Rating: </span><span id="detailVoteAverage">{movie.vote_average}</span></li>
                                    <li id="detailVoteCountWrapper" className="list-group-item"><span className="fw-bold">Votes: </span><span id="detailVoteCount">{movie.vote_count}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}