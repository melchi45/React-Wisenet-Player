import React from 'react';
import { useIntl } from 'react-intl';
import { FaHeart, FaBars } from 'react-icons/fa';
import reactLogo from './assets/logo.svg';

import Player from '../../components/ump-player/Player';

import device1 from '../../assets/json/device_1.json';
import device2 from '../../assets/json/device_2.json';
import device3 from '../../assets/json/device_3.json';

const Main = ({ rtl, handleToggleSidebar }) => {
  const intl = useIntl();
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
      <header>
        <h1>
          <img width={80} src={reactLogo} alt="react logo" />{' '}
          {intl.formatMessage({ id: 'title' })}
        </h1>
        <p>{intl.formatMessage({ id: 'description' })}</p>
        <div className="social-bagdes">
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="GitHub stars"
              src="https://img.shields.io/github/stars/azouaoui-med/react-pro-sidebar?style=social"
            />
          </a>
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="GitHub forks"
              src="https://img.shields.io/github/forks/azouaoui-med/react-pro-sidebar?style=social"
            />
          </a>
        </div>
      </header>
      <div className="player-block">
        <Player id="player" device={device2} control={true} />
        {/* <div className="player-margin"></div>
        <div>
          <Player device={device2} />
        </div> */}
      </div>

      <footer>
        <small>
          © {new Date().getFullYear()} made with{' '}
          <FaHeart style={{ color: 'red' }} /> by -{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://azouaoui.netlify.com"
          >
            Mohamed Azouaoui
          </a>
        </small>
        <br />
        <div className="social-bagdes">
          <a
            href="https://github.com/azouaoui-med"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="GitHub followers"
              src="https://img.shields.io/github/followers/azouaoui-med?label=github&style=social"
            />
          </a>
          <a
            href="https://twitter.com/azouaoui_med"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="Twitter Follow"
              src="https://img.shields.io/twitter/follow/azouaoui_med?label=twitter&style=social"
            />
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Main;
