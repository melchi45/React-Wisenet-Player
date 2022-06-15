import React from 'react';
import logo from '../../assets/img/logo.svg';
import './Main.css';
import './Main.scss';

const Main = () => {
  return (
    <div className="Main">
      <header className="Main-header">
        <img src={logo} className="Main-logo" alt="logo" />
        <p>
          Edit <code>src/pages/main/main.js</code> and save to reload.
        </p>
        <a
          className="Main-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <h6>The color of this paragraph is defined using SASS.</h6>
      </header>
    </div>
  );
};

export default Main;