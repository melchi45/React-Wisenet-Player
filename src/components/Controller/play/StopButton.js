import React, { Component } from 'react';
import { InputAdornment, withStyles } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
import { RemoveRedEye } from '@material-ui/icons';
import PropTypes from 'prop-types';
import './styles/icons.scss';
import './styles/Button.scss';

// import log4javascript
import log4javascript from 'log4javascript';
window.log4javascript = log4javascript;

const styles = (theme) => ({
  eye: {
    cursor: 'pointer',
  },
});

export class StopButton extends Component {
  constructor(props) {
    super(props);
    this.log = log4javascript.getLogger('password_input_ctrl');

    this.onClick = this.onClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onClick(e) {
    if (this.props.disabled) {
      return;
    }
  }

  onKeyPress(e) {
    const enterOrSpace =
      e.key === 'Enter' ||
      e.key === ' ' ||
      e.key === 'Spacebar' ||
      e.which === 13 ||
      e.which === 32;
    if (enterOrSpace) {
      e.preventDefault();
      this.onClick(e);
    }
  }

  // togglePasswordMask = () => {
  //   this.setState((prevState) => ({
  //     passwordIsMasked: !prevState.passwordIsMasked,
  //   }));
  // };

  render() {
    const { classes } = this.props;

    return (
      <div
        role="button"
        className={
          this.props.disabled ? 'stop disabled' : 'inverted grey stop icon link'
        }
        tabIndex={1}
        onClick={this.onClick}
        onKeyPress={this.onKeyPress}
        // type={passwordIsMasked ? 'password' : 'text'}
        // onChange={this.handleChange}
        {...this.props}
      />
    );
  }
}

StopButton.propTypes = {
  // classes: PropTypes.object.isRequired,
  // onKeyDown: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  // value: PropTypes.string.isRequired,
};

// StopButton = withStyles(styles)(StopButton);
