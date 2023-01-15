import SearchForm from './SearchForm';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    const [scroll, setScroll] = useState(0);
    const handleScroll = () => { setScroll(window.pageYOffset > 0); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return (
      <div className="header-wrapper">
        <header className={"header text-light " + (scroll ? "scrolled" : "")}>
          <Link to={`/`} className="site-logo"><h1 className="sr-only">NETFLIX</h1></Link>
          <ul className="main-menu list-group list-group-horizontal m-2">
            <li className="list-group-item list-group-item-invisible text-light">Home</li>
            <li className="list-group-item list-group-item-invisible text-light">TV Shows</li>
            <li className="list-group-item list-group-item-invisible text-light">Movies</li>
            <li className="list-group-item list-group-item-invisible text-light">New & Popular</li>
            <li className="list-group-item list-group-item-invisible text-light">My List</li>
            <li className="list-group-item list-group-item-invisible text-light">Browse by Languages</li>
          </ul>
          <SearchForm></SearchForm>
        </header>
      </div>
    );
  }