import React from 'react';

import "./index.css";

const Navbar = props => {
  return (
    <header id="Navbar" className="flex-container">
      <div className="flex-container-left pointer-on-hover">
        <h1 id="navbar-title">Telementary Box</h1>
      </div>

      <div id="navbar-link-container"
        className="flex-container-center"
      >
        { /*
        <p className="navbar-link">My boxes</p>
        */}
      </div>

    </header>
  )
}

export default Navbar;