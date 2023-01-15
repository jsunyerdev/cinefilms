import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
//import YouTubeToHtml5 from '@thelevicole/youtube-to-html5-loader';

export default function MovieSlide(props) {

    let apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = process.env.REACT_APP_API_URL;
    const imagesRoot = process.env.REACT_APP_IMAGES_ROOT;

    const [trailer, setLastTralier] = useState([]);
    const [logo, setLogo] = useState([]);
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
        let videosFetch = apiUrl + "movie/" + props.id + "/videos?api_key=" + apiKey + "&language=en-US";
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
                if (props.active) {
                    console.log('myvideo: ' + {myvideo});
                    setTimeout(() => {
                        window["youtubeToHTML5Tag"]();
                    }, 100);
                }
            });
        let imagesFetch = apiUrl + "movie/" + props.id + "/images?api_key=" + apiKey;
        fetch(imagesFetch)
            .then((response) => response.json())
            .then(json => {
                let logos = json.logos.filter(image => 
                    image.iso_639_1 === "en"
                );
                if (logos.length > 0) {
                    setLogo(logos[0].file_path);
                }
            });
    }, [props]);
    return (
        <div id="trendingWrapper" className="trending-wrapper">
            {logo.length !== 0 ? <img className="trending-logo" src={imagesRoot + logo} alt=""/> : ""}
            <div className="trending-buttons">
                <button type="button" className="btn-watch-now btn btn-light m-2"><span className="bi-play-fill fs-2"></span> Watch Now</button>
                {props.moreinfo ? <Link to={`/movie/${props.id}`}><button type="button" className="btn-more-info btn btn-secondary"><span className="bi-info-circle fs-2"></span> More Info</button></Link> : ""}
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