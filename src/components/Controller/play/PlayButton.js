import React, { Component } from 'react';
// import { InputAdornment, withStyles } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
// import { RemoveRedEye } from '@material-ui/icons';
// import PropTypes from 'prop-types';
import './styles/icons.scss';
import './styles/Button.scss';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// import log4javascript
import log4javascript from 'log4javascript';
window.log4javascript = log4javascript;

// replace 1568, 1568 with your SVG viewbox
// e001 is the unicode point which represents this custom icon. Increment this value for other icons
// replace 'M256...' with your single-path SVG
// var faPlay = {
//   prefix: 'fas',
//   iconName: 'play',
//   icon: [
//     448,
//     448,
//     [],
//     'f04b',
//     'M256 440C119 440 8 329 8 192S119 -56 256 -56S504 55 504 192S393 440 256 440zM371.7 168L195.7 67C179.9 58.2 160 69.5 160 88V296C160 314.4 179.8 325.8 195.7 317L371.7 210C388.1 200.8 388.1 177.1 371.7 168z',
//   ],
// };

// library.add(faPlay);

// library.add(faShoppingCart);

// const styles = (theme) => ({
//   eye: {
//     cursor: 'pointer',
//   },
// });

export class PlayButton extends Component {
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
      <div>
        <div
          role="button"
          className={
            this.props.disabled ? 'play disabled' : 'inverted grey play icon'
          }
          tabIndex={0}
          onClick={this.onClick}
          onKeyPress={this.onKeyPress}
          // type={passwordIsMasked ? 'password' : 'text'}
          // onChange={this.handleChange}
          {...this.props}
        >
          {/* <FontAwesomeIcon icon="shopping-cart" /> */}
          {/* <span className={'play'} /> */}
        </div>
      </div>
    );
  }
}

PlayButton.propTypes = {
  // classes: PropTypes.object.isRequired,
  // onKeyDown: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  // value: PropTypes.string.isRequired,
};

// PlayButton = withStyles(styles)(PlayButton);
