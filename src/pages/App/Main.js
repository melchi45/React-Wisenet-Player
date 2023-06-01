import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { FaHeart, FaBars } from 'react-icons/fa';
import reactLogo from './assets/logo.svg';

import Player from '../../components/ump-player/Player';
import SimpleTable from '../../components/Controller/Table/SimpleTable';

import Devices from './Devices';

import device1 from '../../assets/json/device_1.json';
import device2 from '../../assets/json/device_2.json';
import device3 from '../../assets/json/device_3.json';
import device4 from '../../assets/json/device_4.json';

function createData(
  id,
  DeviceName,
  Model,
  IPAddress,
  MACAddress,
  Port,
  Gateway,
  SubnetMask,
  SupportSunapi,
  URL
) {
  return {
    id,
    DeviceName,
    Model,
    IPAddress,
    MACAddress,
    Port,
    Gateway,
    SubnetMask,
    SupportSunapi,
    URL,
  };
}

const Main = ({ rtl, handleToggleSidebar }) => {
  const intl = useIntl();
  const data = Devices();

  //   const [devices, setDevices] = useState([]);
  //   React.useEffect(() => {
  //     window.addEventListener('discover', discoveryHandler, false);

  //     // cleanup this component
  //     return () => {
  //       window.removeEventListener('discover', discoveryHandler);
  //     };
  //   }, []);

  //   const discoveryHandler = (event) => {
  //     try {
  //       if (
  //         event.type === 'discover' &&
  //         event.detail !== null &&
  //         event.detail.device !== null
  //       ) {
  //         // device data comming from event listener for device discovery
  //         const newDevice = event.detail.device;
  //         setDevices((oldDevices) => [...oldDevices, newDevice]);
  //       }
  //     } catch (error) {
  //       console.log('Error on postMessage back to APP' + error);
  //     }
  //   };
  const cameras = [
    createData(
      1,
      'PNM-C32083RVQ',
      0,
      '192.168.212.34',
      '',
      80,
      '192.168.212.1',
      '255.255.255.0',
      true,
      'http://192.168.212.34/index.html'
    ),
  ];

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
      <div className="grid-flow">
        {data.map((d) => (
          <div key={d.id}>
            <div className="player-block">
              <Player id="player1" device={d} control={true} />
            </div>
            {/* <h1>{d.id}</h1> */}
          </div>
        ))}
      </div>
      {/* <div className="player-block">
        <Player id="player1" device={Devices} control={true} />
        {<div className="player-margin"></div>
        <div>
          <Player device={device2} />
        </div>}
      </div> */}

      <SimpleTable devices={cameras} />

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
