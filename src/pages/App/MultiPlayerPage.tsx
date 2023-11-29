import React, { useState, useEffect } from 'react';
import SplitPane, { Pane } from 'react-split-pane';
import {
  IDevice,
  MultiDevicesProps
} from '../../components/ump-player/Constant/Constant';

import Player from '../../components/ump-player/Player';
// import Devices from './Devices';


export const MultiPlayerPage: React.FC<MultiDevicesProps> = (props: MultiDevicesProps) => {
  // https://reactjsexample.com/resizable-split-panes-for-react-js/
  const [sizes, setSizes] = useState([
    '60%',
    'auto',
  ]);
  const [selectedDevice, setSelectedDevices] = useState<IDevice>({
    id: "ump-player",
    hostname: "",
    port: 0,
    username: "",
    profile: "H.264",
    channel: 1,
    device: "camera",
    password: "",
    autoplay: true,
    statistics: false,
    https: false
  });

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      // Perform actions before the component unloads
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const onClick = (item: IDevice) => {
    let result = props.devices
      .filter((device: IDevice): device is IDevice => {
        return device.id === item.id;
      });
    const device = Object.assign({}, result[0]);
    device.id = "ump-player-selected";
    setSelectedDevices(device as IDevice);
  }

  const handleDragStarted = () => {
    console.log('Drag started');
  };

  const handleDrag = () => {
    console.log('Dragging');
  };

  const handleDragFinished = () => {
    console.log('Drag finished');
  };

  return (
    <div className="container-block">
      <div className="grid-container">
        <SplitPane
          split="vertical"
          sizes={sizes}
          onChange={setSizes}
          primary="second"
          // defaultSize={800}
          // maxSize={2400}
          minSize={340}
          onDragStarted={handleDragStarted}
          onDrag={handleDrag}
          onDragFinished={handleDragFinished}>
          <Pane className="grid-main">
            {/* {state.selectedDevice.map((device: IDevice) => ( */}
            <div className="player-block" key={selectedDevice.id}>
              <Player device={selectedDevice} control={true} />
            </div>
            {/* ))} */}
          </Pane>
          <Pane className="grid-flow">
            {props.devices.map((device: IDevice) => (
              <div className="player-block" key={device.id} onClick={() => onClick(device)}>
                <Player device={device} control={true} />
              </div>
            ))}
            {/* {state.devices.map((device: IDevice) => (
            <div className="player-block" key={device.id}>
              <Player device={device} control={true} />
            </div>
          ))} */}
          </Pane>
        </SplitPane>
      </div>
    </div>
  );
};