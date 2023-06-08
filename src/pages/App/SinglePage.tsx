import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

import Player from '../../components/ump-player/Player';

import device1 from '../../assets/json/device_1.json';
import device2 from '../../assets/json/device_2.json';
import device3 from '../../assets/json/device_3.json';
import device4 from '../../assets/json/device_4.json';

export const SinglePage: React.FC = () => {
  const intl = useIntl();

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

  return (
    <main>
      <div className="player-block">
        <Player id="player1" device={device1} control={true} />
      </div>
    </main>
  );
};
