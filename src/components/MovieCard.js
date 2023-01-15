import { Link } from 'react-router-dom';

export default function MovieCard(props) {

    const imagesRoot = process.env.REACT_APP_IMAGES_ROOT;

    return (
        <Link to={`/movie/${props.id}`}>
            <div className={"movieImageWrapper " + props.type}>
                {props.poster ? <img src={imagesRoot + props.poster} className="movieImage" alt="" /> : ""}
                {!props.poster ? <div className="movieImage" alt=""></div> : ""}
            </div>
        </Link>
    )
}