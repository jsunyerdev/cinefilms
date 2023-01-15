import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
//import YouTubeToHtml5 from '@thelevicole/youtube-to-html5-loader';

export default function MovieSlide(props) {

    const params = useParams();

    let apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = process.env.REACT_APP_API_URL;
    const imagesRoot = process.env.REACT_APP_IMAGES_ROOT;

    const [trailer, setLastTralier] = useState([]);
    const [movie, setMovie] = useState([]);
    const [isMuted, setAudio] = useState(true);
    const myvideo = useRef(null);

    const handleAudio = () => {
        setAudio(!isMuted);
        myvideo.current.muted = !isMuted;
    };

    const handleFullscreen = () => {
        if (myvideo.current.requestFullscreen) {
            myvideo.current.requestFullscreen();
        } else if (myvideo.current.webkitRequestFullscreen) {
            myvideo.current.webkitRequestFullscreen();
        } else if (myvideo.current.msRequestFullscreen) {
            myvideo.current.msRequestFullscreen();
        }
    };
    
    useEffect(() => {
        let videosFetch = apiUrl + "movie/" + params.movieId + "/videos?api_key=" + apiKey + "&language=en-US";
        fetch(videosFetch)
            .then((response) => response.json())
            .then(json => {
                let trailers = json.results.filter(video => 
                    video.type === "Trailer" &&
                    video.site === "YouTube" &&
                    video.official === true
                );
                let lastTrailer = trailers.reduce((prev, current) => {
                    let date = new Date(current.published_at);
                    let milliseconds = date.getTime();
                    current.published_at = milliseconds;
                    return (
                        current.type === "Trailer" && 
                        current.site === "YouTube" &&
                        current.official === true &&
                        prev.published_at < current.published_at
                    ) ? prev : current
                });
                setLastTralier(lastTrailer);    
                setTimeout(() => {
                    window["youtubeToHTML5Tag"]();
                }, 100);
            });
        let MovieFetch = "https://api.themoviedb.org/3/movie/" + params.movieId + '?api_key=' + apiKey;
        fetch(MovieFetch)
            .then((response) => response.json())
            .then(json => {
                setMovie(json);
            });
    }, [params]);
    return (
        <div id="trendingWrapper" className="trending-wrapper">
            <img className="movie-poster" src={imagesRoot + movie.poster_path} alt=""/>
            <div className="trending-buttons">
                <button type="button" className="btn-watch-now btn btn-light m-2"><span className="bi-play-fill fs-2"></span> Watch Now</button>
                <button type="button" className="btn-unmute bg-transparent border-none text-light fs-2" onClick={handleAudio}>
                    {!isMuted ? <span className="bi-volume-up-fill"></span> : ""}
                    {isMuted ? <span className="bi-volume-mute-fill"></span> : ""}
                </button>
                <button type="button" className="btn-fullscreen bg-transparent border-none text-light fs-2" onClick={handleFullscreen}><span className="bi-fullscreen fs-2"></span></button>
            </div>
            <div className="video-gradient"></div>
            {props.active ? <video ref={myvideo} className="trending-video" width="100%" data-yt2html5={"https://www.youtube.com/watch?v=" + trailer.key} autoPlay muted loop></video> : <video className="trending-video"></video>}
        </div>
    )
}