import React, { Component } from 'react';
// import { Line } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
// import { StreamingPlugin, RealTimeScale } from 'chartjs-plugin-streaming';

import '@melchi45/ump-player';

// import './styles/Player.scss';

// Change default options for ALL charts
// Chart.defaults.set('plugins.streaming', {
//   duration: 1000,
// });

// Chart.register(StreamingPlugin, RealTimeScale);

// const data = {
//   datasets: [
//     {
//       label: 'Dataset 1',

//       fill: false,
//       lineTension: 0,
//       backgroundColor: '#f44336',
//       borderColor: '#f44336',
//       // borderJoinStyle: 'miter',
//       // pointRadius: 0,
//       showLine: true,
//       data: [],
//     },
//   ],
// };

// const options = {
//   // Assume x axis is the realtime scale
//   pan: {
//     enabled: true, // Enable panning
//     mode: 'x', // Allow panning in the x direction
//     rangeMin: {
//       x: null, // Min value of the delay option
//     },
//     rangeMax: {
//       x: null, // Max value of the delay option
//     },
//   },
//   zoom: {
//     enabled: true, // Enable zooming
//     mode: 'x', // Allow zooming in the x direction
//     rangeMin: {
//       x: null, // Min value of the duration option
//     },
//     rangeMax: {
//       x: null, // Max value of the duration option
//     },
//   },
//   scales: {
//     xAxes: [
//       {
//         type: 'realtime',
//         realtime: {
//           refresh: 300,
//           onRefresh: function () {
//             // updateScales();
//           },
//           delay: 300,
//           // onRefresh: function () {
//           //   this.data.datasets[0].data.push({
//           //     x: Date.now(),
//           //     y: Math.random() * 100,
//           //   });
//           // },
//         },
//       },
//     ],
//     yAxes: [
//       {
//         scaleLabel: {
//           display: true,
//           fontFamily: 'Arial',
//           labelString: 'Moment',
//           fontSize: 10,
//           fontColor: '#6c757d',
//         },
//         ticks: {
//           max: 100,
//           min: 0,
//         },
//       },
//     ],
//   },
//   tooltips: {
//     mode: 'nearest',
//     intersect: false,
//   },
//   hover: {
//     mode: 'nearest',
//     intersect: false,
//   },
// };

class Player extends Component {
  constructor(props) {
    super(props);

    // state 초기값 설정
    this.state = {
      index: 0,
    };
  }

  // updateScales() {
  //   var datasets = this.data.datasets.concat(Chart.data.datasets);
  //   this.options.scales.yAxes[0].ticks = this.options.scales.yAxes[0].ticks = {
  //     suggestedMin: Math.min(
  //       ...datasets.map(function (dataset) {
  //         return Math.min(
  //           ...dataset.data.map(function (value) {
  //             return value.y;
  //           })
  //         );
  //       })
  //     ),
  //     suggestedMax: Math.max(
  //       ...datasets.map(function (dataset) {
  //         return Math.max(
  //           ...dataset.data.map(function (value) {
  //             return value.y;
  //           })
  //         );
  //       })
  //     ),
  //   };
  //   Chart.update();
  // }

  onError = (event) => {
    console.log('onError: ' + event);
  };

  onMeta = (event) => {
    console.log('onMeta: ' + event);
  };

  onClose = (event) => {
    console.log('onClose: ' + event);
  };

  onResize = (event) => {
    console.log('onResize: ' + event);
  };

  onStateChanged = (event) => {
    console.log('onStateChanged: ' + event);
  };

  onTimestamp = (event) => {
    // console.log('onTimestamp: ' + event.detail.timestamp);
  };

  onCapture = (event) => {
    console.log('onCapture: ' + event);
  };

  onStatistics = (event) => {
    console.log('onStatistics: ' + window.fastJsonStringfy(event.detail));

    if (event.detail.statistics.type === 'network') {
      console.log('network data');
      let bytes = event.detail.statistics.current / 8;
      // data.datasets[0].data.push({
      //   x: Date.now(),
      //   y: bytes / 1000,
      // });
    }
  };

  onBackupState = (event) => {
    console.log('onBackupState: ' + event.detail);
  };
  onPlayerModeChanged = (event) => {
    console.log('onPlayerModeChanged: ' + event);
  };

  onInstantPlayback = (event) => {
    console.log('onInstantPlayback: ' + event);
  };
  onWaiting = (event) => {
    console.log('onWaiting: ' + event);
  };
  onNetworkState = (event) => {
    console.log('onNetworkState: ' + event);
  };
  onMetaImage = (event) => {
    console.log('onMetaImage: ' + event);
  };
  onDeviceTypeChanged = (event) => {
    console.log('onDeviceTypeChanged: ' + event);
  };
  onProfileNumberChanged = (event) => {
    console.log('onProfileNumberChanged: ' + event);
  };
  onProfileNameChanged = (event) => {
    console.log('onProfileNameChanged: ' + event);
  };
  onChannelNumberChanged = (event) => {
    console.log('onChannelNumberChanged: ' + event);
  };
  onHostnameChanged = (event) => {
    console.log('onHostnameChanged: ' + event);
  };
  onVolumeLevelChanged = (event) => {
    console.log('onVolumeLevelChanged: ' + event);
  };
  onPortNumberChanged = (event) => {
    console.log('onPortNumberChanged: ' + event);
  };
  onFullscreenModeChanged = (event) => {
    console.log('onFullscreenModeChanged: ' + event);
  };
  onSunapiClientChanged = (event) => {
    console.log('onSunapiClientChanged: ' + event);
  };
  onBestshotFileterChanged = (event) => {
    console.log('onBestshotFileterChanged: ' + event);
  };
  onBestshot = (event) => {
    console.log('onBestshot: ' + event);
  };
  onStream = (event) => {
    console.log('onStream: ' + event);
  };
  onTimezoneChanged = (event) => {
    console.log('onTimezoneChanged: ' + event);
  };
  componentDidMount() {
    this.ump.addEventListener('error', this.onError);
    this.ump.addEventListener('meta', this.onMeta);
    this.ump.addEventListener('close', this.onClose);
    this.ump.addEventListener('resize', this.onResize);
    this.ump.addEventListener('statechange', this.onStateChanged);
    this.ump.addEventListener('timestamp', this.onTimestamp);
    this.ump.addEventListener('capture', this.onCapture);
    this.ump.addEventListener('statistics', this.onStatistics);
    this.ump.addEventListener('backupstatechange', this.onBackupState);
    this.ump.addEventListener('changeplayermode', this.onPlayerModeChanged);
    this.ump.addEventListener('instantplayback', this.onInstantPlayback);
    this.ump.addEventListener('waiting', this.onWaiting);
    this.ump.addEventListener('networkstate', this.onNetworkState);
    this.ump.addEventListener('networkstate', this.onNetworkState);
    this.ump.addEventListener('metaImage', this.onMetaImage);

    // add the onchange method from element property
    this.ump.addEventListener('changedevicetype', this.onDeviceTypeChanged);
    this.ump.addEventListener(
      'changeprofilenumber',
      this.onProfileNumberChanged
    );
    this.ump.addEventListener('changeprofile', this.onProfileNameChanged);
    this.ump.addEventListener('changechannel', this.onChannelNumberChanged);
    this.ump.addEventListener('changehostname', this.onHostnameChanged);
    this.ump.addEventListener('changevolume', this.onVolumeLevelChanged);
    this.ump.addEventListener('changeport', this.onPortNumberChanged);
    this.ump.addEventListener('changefullscreen', this.onFullscreenModeChanged);
    this.ump.addEventListener('changesunapiclient', this.onSunapiClientChanged);
    this.ump.addEventListener(
      'changebestshotfilter',
      this.onBestshotFileterChanged
    );
    this.ump.addEventListener('changebestshot', this.onBestshot);
    this.ump.addEventListener('stream', this.onStream);
    this.ump.addEventListener('changetimezone', this.onTimezoneChanged);
  }

  componentWillUnmount() {
    this.ump.removeEventListener('error', this.onError);
    this.ump.removeEventListener('meta', this.onMeta);
    this.ump.removeEventListener('close', this.onClose);
    this.ump.removeEventListener('resize', this.onResize);
    this.ump.removeEventListener('statechange', this.onStateChanged);
    this.ump.removeEventListener('timestamp', this.onTimestamp);
    this.ump.removeEventListener('capture', this.onCapture);
    this.ump.removeEventListener('statistics', this.onStatistics);
    this.ump.removeEventListener('backupstatechange', this.onBackupState);
    this.ump.removeEventListener('changeplayermode', this.onPlayerModeChanged);
    this.ump.removeEventListener('instantplayback', this.onInstantPlayback);
    this.ump.removeEventListener('waiting', this.onWaiting);
    this.ump.removeEventListener('networkstate', this.onNetworkState);
    this.ump.removeEventListener('metaImage', this.onMetaImage);

    // add the onchange method from element property
    this.ump.removeEventListener('changedevicetype', this.onDeviceTypeChanged);
    this.ump.removeEventListener(
      'changeprofilenumber',
      this.onProfileNumberChanged
    );
    this.ump.removeEventListener('changeprofile', this.onProfileNameChanged);
    this.ump.removeEventListener('changechannel', this.onChannelNumberChanged);
    this.ump.removeEventListener('changehostname', this.onHostnameChanged);
    this.ump.removeEventListener('changevolume', this.onVolumeLevelChanged);
    this.ump.removeEventListener('changeport', this.onPortNumberChanged);
    this.ump.removeEventListener(
      'changefullscreen',
      this.onFullscreenModeChanged
    );
    this.ump.removeEventListener(
      'changesunapiclient',
      this.onSunapiClientChanged
    );
    this.ump.removeEventListener(
      'changebestshotfilter',
      this.onBestshotFileterChanged
    );
    this.ump.removeEventListener('changebestshot', this.onBestshot);
    this.ump.removeEventListener('stream', this.onStream);
    this.ump.removeEventListener('changetimezone', this.onTimezoneChanged);
  }

  render() {
    this.props.device.id = 'player-index-' + this.state.index;
    const attrs = this.props.device;

    return (
      <ump-player ref={(elem) => (this.ump = elem)} {...attrs}></ump-player>
    );
  }
}

export default Player;
