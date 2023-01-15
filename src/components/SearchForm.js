import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';

export default function SearchForm() {

    const params = useParams();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState([]);

    useEffect(() => {
        if (params.keyword) {
            setSearchTerm(params.keyword);
        }
    },[params.keyword]);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleClear = event => {
        setSearchTerm('');
        navigate('/');
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (searchTerm.length > 0) {
            navigate('/search/'+searchTerm);
        } else {
            navigate('/');
        }
      };

    return (
        <form className="search-form d-flex justify-content-center text-light" onSubmit={handleSubmit}>
            <input type="text" name="name" className="search-input" placeholder="Search movies by keyword" value={searchTerm} onChange={handleChange} />
            <button type="submit" value="Search" className="search-button"><span className="bi bi-search"></span></button>
            <button type="button" value="Clear" className="clear-button" onClick={handleClear.bind(this)}><span className="bi bi-x"></span></button>
        </form>
    );
}