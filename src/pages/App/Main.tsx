import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

import Player from '../../components/ump-player/Player';
// import SimpleTable from '../../components/Controller/Table/Table';

import Devices from './Devices';

import device1 from '../../assets/json/device_1.json';
import device2 from '../../assets/json/device_2.json';
import device3 from '../../assets/json/device_3.json';
import device4 from '../../assets/json/device_4.json';

// function createData(
//   id,
//   DeviceName,
//   Model,
//   IPAddress,
//   MACAddress,
//   Port,
//   Gateway,
//   SubnetMask,
//   SupportSunapi,
//   URL
// ) {
//   return {
//     id,
//     DeviceName,
//     Model,
//     IPAddress,
//     MACAddress,
//     Port,
//     Gateway,
//     SubnetMask,
//     SupportSunapi,
//     URL,
//   };
// }

export const Main: React.FC = () => {
  const intl = useIntl();
  const data = Devices();

  //   const [devices, setDevices] = useState([]);
    React.useEffect(() => {
        chrome.runtime.onMessage.addListener( // this is the message listener
            function(request, sender, sendResponse) {
                
            }
        );

        //   window.addEventListener('discover', discoveryHandler, false);

    //   // cleanup this component
    //   return () => {
    //     window.removeEventListener('discover', discoveryHandler);
    //   };
    }, []);

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
//   const cameras = [
//     createData(
//       1,
//       'PNM-C32083RVQ',
//       0,
//       '192.168.212.34',
//       '',
//       80,
//       '192.168.212.1',
//       '255.255.255.0',
//       true,
//       'http://192.168.212.34/index.html'
//     ),
//   ];

  return (
    <div>
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
        {/* <SimpleTable devices={cameras} /> */}
    </div>
  );
};