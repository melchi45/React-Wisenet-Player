import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
// import { PlayButton } from './PlayButton';
// import { StopButton } from './StopButton';

import {
  BsFillPlayFill,
  BsFillStopFill,
  BsFillPauseFill,
} from 'react-icons/bs';
import { IconContext, icons } from 'react-icons';

import styles from './styles/ControlBox.scss';
import './styles/Icons.scss';

// import log4javascript
import log4javascript from 'log4javascript';
window.log4javascript = log4javascript;

// const styles = (theme) => ({
//   controller: {
//     display: 'flex',
//     position: 'absolute',
//   },
// });

export class Controller extends Component {
  constructor(props) {
    super(props);
    this.log = log4javascript.getLogger('password_input_ctrl');
  }

  render() {
    const { classes, playState, handlePlay, handleStop, handlePause } =
      this.props;

    return (
      <div className={'controlbox'}>
        <div className={'play_control'}>
          {/* <i
            role="button"
            className={
              playState == 0 || playState == 2
                ? 'icon_zoom_2x inverted grey play icon link'
                : 'icon_zoom_2x inverted grey play icon disabled'
            }
            tabIndex={0}
            onClick={handlePlay}
            {...this.props}
          ></i>
          <i
            role="button"
            className={
              playState == 1
                ? 'icon_zoom_2x inverted grey stop icon link'
                : 'icon_zoom_2x inverted grey stop icon disabled'
            }
            tabIndex={1}
            onClick={handleStop}
            {...this.props}
          ></i>
          <i
            role="button"
            className={
              playState == 1
                ? 'icon_zoom_2x inverted grey play icon link'
                : 'icon_zoom_2x inverted grey play icon disabled'
            }
            tabIndex={1}
            onClick={handlePause}
            {...this.props}
          ></i> */}
          <IconContext.Provider
            value={{
              color: 'blue',
              size: '24px',
              className: 'global-class-name',
            }}
          >
            <BsFillPlayFill
              className={
                playState == 0 || playState == 2
                  ? 'grey icon link'
                  : 'grey icon disabled'
              }
              onClick={handlePlay}
            />
            <BsFillStopFill
              className={
                playState == 1 ? 'grey icon link' : 'grey icon disabled'
              }
              onClick={handleStop}
            />
            <BsFillPauseFill
              className={
                playState == 1 ? 'grey icon link' : 'grey icon disabled'
              }
              onClick={handlePause}
            />
          </IconContext.Provider>
        </div>
      </div>
    );
  }
}

Controller.propTypes = {
  // classes: PropTypes.object.isRequired,
  // onKeyDown: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  // value: PropTypes.string.isRequired,
};

Controller = withStyles(styles)(Controller);
