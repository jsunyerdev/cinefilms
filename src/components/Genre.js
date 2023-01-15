
import GenreMovies from './GenreMovies';

export default function Genre(props) {
    return (
        <>
            <h2 className="genre-header fs-3 text-light">{props.title}</h2>
            {<GenreMovies genre={props.id}></GenreMovies>}
        </>
    )
}