import React, { Component, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
// import { StreamingPlugin, RealTimeScale } from 'chartjs-plugin-streaming';

// import { appendScript } from '../common/appendScript';
// import { removeScript } from '../common/removeScript';
// import { importScript } from '../common/importScript';

// import { importScript } from 'components/common/importScripts';
// import log4javascript
import log4javascript from 'log4javascript';
import CryptoJS from 'crypto-js';

import '@melchi45/ump-player';
import './styles/Player.scss';

import { RestClientConfig } from './sunapi/RestClientConfig';
import { UmpPlayState } from './Constant/Constant';

import { SunapiManager } from './sunapi/SunapiManager';
import { SunapiException } from './Exception/SunapiException';
import { AccountService } from './sunapi/AccountService';
import { AttributeService } from './sunapi/AttributeService';

// import { PasswordInput } from '../Controller/Input/PasswordInput';
// import { UsernameInput } from '../Controller/Input/UsernameInput';
import { LoginDialog } from '../Controller/Dialog/LoginDialog';
import { NavigationBar } from '../Controller/play/NavigationBar';

import { Controller } from '../Controller/play/Controller';

window.log4javascript = log4javascript;
window.CryptoJS = CryptoJS;

const RESTCLIENT_CONFIG = RestClientConfig;
const styles = (theme) => ({ hidden: { display: 'none' } });

class Player extends Component {
  constructor(props) {
    super(props);
    window.verboseLevel('info', window.logger.rtsp);
    this.useSunapi = true;
    // const [control, setControl] = useState(false);
    // state 초기값 설정
    // this.state = this.props.device;
    this.state = {
      username: '',
      password: '',
      isLogin: false,
      playState: 0,
      popupLogin: false,
    };

    this.props.device.serverType = RESTCLIENT_CONFIG.serverType;
    // this.props.device.ClientIPAddress = RESTCLIENT_CONFIG.digest.ClientIPAddress;

    if (typeof this.props.device.username !== 'undefined') {
      this.state.username = this.props.device.username;
    }
    if (typeof this.props.device.password !== 'undefined') {
      this.state.password = this.props.device.password;
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.handleProfile = this.handleProfile.bind(this);
    this.handleAccount = this.handleAccount.bind(this);
    this.handleLoginCancled = this.handleLoginCancled.bind(this);

    this.account_context_menu = [
      { key: 'profile', title: 'Profile', task: this.handleProfile },
      { key: 'myaccount', title: 'My account', task: this.handleAccount },
      { key: 'logout', title: 'Logout', task: this.handleLogout },
    ];
    this.login_context_menu = [
      { key: 'login', title: 'Log In', task: this.handleLoginCancled },
    ];
  }

  onChangeAccountInfo = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLoginCancled = (event) => {
    try {
      event.preventDefault();

      this.setState({ popupLogin: true });
    } catch (error) {
      console.error(error);
    }
  };

  handleLogin = (event) => {
    try {
      event.preventDefault();

      if (this.useSunapi) {
        this.props.device.username = this.state.username;
        this.props.device.password = this.state.password;

        if (this.ump.isplay) {
          this.ump.stop();
        }
        // initialize sunapi manager
        this.sunapiMng = new SunapiManager();

        const promises = [
          this.sunapiMng.init(this.props.device),
          this.sunapiMng.login(),
        ];
        Promise.all(promises)
          .then((data) => {
            console.log(data);

            if (data.length == 2) {
              let initializedData = window.fastJsonStringfy(data[0]);
              let accountInfo = {};

              console.log(initializedData);

              if (data[1] && data[1].Users) {
                let temp = data[1].Users;
                for (var idx = 0; idx < temp.length; idx++) {
                  if (temp[idx].UserID === this.state.username) {
                    accountInfo = temp[idx];
                    break;
                  }
                }

                AccountService.setAccount(accountInfo)
                  .then((temp) => {
                    this.account = temp;
                    this.ump.sunapiClient = this.sunapiMng.getSunapiClient();

                    this.setState({ isLogin: true });
                    this.setState({ popupLogin: false });

                    this.ump.play();
                  })
                  .catch((error) => {
                    console.log('Fail to account service.');
                  });
              }
            }
          })
          .catch((error) => {
            console.error(error);
            if (error instanceof SunapiException) {
              if (error.status == 401) {
                // TODO: popup message and uri
              } else if (error.status == 490) {
                // TODO: popup message and uri
              }
            }
          });
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  handleLogout = (event) => {
    try {
      event.preventDefault();

      if (this.ump.isplay) {
        this.ump.stop();
      }

      this.sunapiMng.logout();
      this.sunapiMng = null;
      this.account = null;

      this.setState({ isLogin: false });
    } catch (error) {
      console.error('error', error);
    }
  };

  handleProfile = (event) => {
    console.log(event);
  };

  handleAccount = (event) => {
    console.log(event);
  };

  handlePlay = () => {
    try {
      console.log('Play button clicked');
      this.ump.play();
    } catch (error) {
      console.error(error);
    }
  };

  handleStop = () => {
    console.log('Stop button clicked');
    this.ump.stop();
  };

  handlePause = () => {
    console.log('Pause button clicked');
    this.ump.pause();
  };

  handleDegree0 = () => {
    if (this.ump.umpWrapperElement) {
      this.ump.umpWrapperElement.removeAttribute('style');
      this.ump.umpWrapperElement.removeAttribute('class');
      this.ump.umpWrapperElement.classList.add('degree_0');
      this.ump.umpWrapperElement.classList.add('center_0_or_180');
    }
  };

  handleDegree90 = () => {
    if (this.ump.umpWrapperElement) {
      this.ump.umpWrapperElement.removeAttribute('style');
      this.ump.umpWrapperElement.removeAttribute('class');
      this.ump.umpWrapperElement.classList.add('degree_90');
      this.ump.umpWrapperElement.classList.add('center_90_or_270');
    }
  };

  handleDegree180 = () => {
    this.ump.umpWrapperElement.removeAttribute('style');
    this.ump.umpWrapperElement.removeAttribute('class');
    this.ump.umpWrapperElement.classList.add('degree_180');
    this.ump.umpWrapperElement.classList.add('center_0_or_180');
  };

  handleDegree270 = () => {
    if (this.ump.umpWrapperElement) {
      this.ump.umpWrapperElement.removeAttribute('style');
      this.ump.umpWrapperElement.removeAttribute('class');
      this.ump.umpWrapperElement.classList.add('degree_270');
      this.ump.umpWrapperElement.classList.add('center_90_or_270');
    }
  };

  handleMirror = () => {
    if (this.ump.umpWrapperElement) {
      this.ump.umpWrapperElement.removeAttribute('style');
      this.ump.umpWrapperElement.removeAttribute('class');
      this.ump.umpWrapperElement.classList.add(
        'degree_vertical_flip_upside_down_mirror'
      );
    }
  };

  handleFlip = () => {
    if (this.ump.umpWrapperElement) {
      this.ump.umpWrapperElement.removeAttribute('style');
      this.ump.umpWrapperElement.removeAttribute('class');
      this.ump.umpWrapperElement.classList.add(
        'degree_horizontal_flip_left_right_mirror'
      );
    }
  };

  onError = (event) => {
    console.log('onError: ' + window.fastJsonStringfy(event.detail));

    switch (window.toHex(event.detail.error)) {
      case '0x0000':
        console.log('play started');
        // this.setState({ playState: true });
        break;
      case '0x0001':
        console.log('play stopped');
        if (this.ump.isplay) {
          // this.setState({ playState: false });
        }
        break;
      case '0x0203':
        console.log('try reconnect');
        break;
      default:
        break;
    }
  };

  onMeta = (event) => {
    console.log('onMeta: ' + event);
  };

  onClose = (event) => {
    console.log('onClose: ' + event);
  };

  onResize = (event) => {
    console.log('onResize: ' + event);
    this.ump.video.style.width = '100%';
    this.ump.video.style.height = '100%';
  };

  onStateChanged = (event) => {
    console.log('onStateChanged: ' + event);
    this.setState({ playState: event.detail.readyState });

    switch (this.state.playState) {
      case UmpPlayState.PLAYING:
        console.log('Playing');
        // this.setState({ playState: true });
        break;
      case UmpPlayState.STOPPED:
        console.log('Stopped');
        // this.setState({ playState: false });
        break;
      default:
        break;
    }
  };

  onTimestamp = (event) => {
    // console.log('onTimestamp: ' + event.detail.timestamp);
  };

  onCapture = (event) => {
    console.log('onCapture: ' + event);
  };

  onStatistics = (event) => {
    // console.log('onStatistics: ' + window.fastJsonStringfy(event.detail));

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
  onUsernameChanged = (event) => {
    console.log('onUsernameChanged: ' + event);
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
  onLogin = (event) => {
    // AttributeService.setDeviceInfo(element.data);
  };
  componentDidMount() {
    // initialize listener
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
    this.ump.addEventListener('changeusername', this.onUsernameChanged);
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

    // initialize sunapi manager
    // this.sunapiMng = new SunapiManager();

    // if (
    //   typeof this.props.device === 'undefined' ||
    //   this.props.device === null ||
    //   this.props.device === ''
    // ) {
    // }

    // this.props.device.ClientIPAddress = '127.0.0.1';

    // const promise = [];
    // this.sunapiMng
    //   .init(this.props.device)
    //   .then((init) => {
    //     if (init.Initialized) {
    //       this.sunapiMng.login().then((accountInfo) => {
    //         AccountService.setAccount(accountInfo);
    //         this.ump.sunapiClient = this.sunapiMng.getSunapiClient();
    //       });
    //     } else {
    //       // TODO: redirect to login page
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     if (error instanceof SunapiException) {
    //       // var strMessage =
    //       //   '<div><h4>Error Code: ' +
    //       //   toHex(error.errorCode) +
    //       //   '<br>Error: ' +
    //       //   error.message +
    //       //   '</h4></div>';
    //     }
    //   });
    // // this.ump.play();
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
    this.ump.removeEventListener('changeusername', this.onUsernameChanged);
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
    // if (this.useSunapi) {
    //   this.props.device.password = undefined;
    // }

    // if (
    //   typeof this.props.device.password === 'undefined' ||
    //   this.props.device.password == ''
    // ) {
    //   this.props.device.autoplay = false;
    // }

    // console.log('state', this.state.playState);

    return (
      <div >
        <div id={'container-' + this.props.device.id} className="container">
          <NavigationBar
            account={this.account}
            isLogin={this.state.isLogin}
            menuData={
              this.state.isLogin
                ? this.account_context_menu
                : this.login_context_menu
            }
          />
          <Controller
            playState={this.state.playState}
            handlePlay={this.handlePlay}
            handleStop={this.handleStop}
            handlePause={this.handlePause}
            handleDegree0={this.handleDegree0}
            handleDegree90={this.handleDegree90}
            handleDegree180={this.handleDegree180}
            handleDegree270={this.handleDegree270}
            handleMirror={this.handleMirror}
            handleFlip={this.handleFlip}
          />

          <LoginDialog
            open={this.state.popupLogin}
            // open={false}
            parentId={'container-' + this.props.device.id}
            username={this.state.username || ''}
            password={this.state.password || ''}
            onChangeAccountInfo={this.onChangeAccountInfo}
            handleLogin={this.handleLogin}
          />
          <ump-player
            class="ump-player"
            ref={(elem) => (this.ump = elem)}
            {...this.props.device}
          />
        </div>
      </div>
    );
  }
}

export default Player;
