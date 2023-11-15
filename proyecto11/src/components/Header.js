import React from 'react';
import logo from '../images/logo.png';
// import './AppHeader.css';

function Header() {
  return (
    <header className="header">
    <img src={logo} alt="Logo de empresa tripleten"/>
  </header>
  );
}

export default Header;

