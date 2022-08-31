import React, { Component } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { withStyles } from '@material-ui/core';
import { MdAccountBox } from 'react-icons/md';
import { IconContext, icons } from 'react-icons';

import styles from './styles/NavigationBar.scss';
import './styles/Icons.scss';

// import log4javascript
import log4javascript from 'log4javascript';
window.log4javascript = log4javascript;

export class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.log = log4javascript.getLogger('navigationbar_ctrl');
  }

  render() {
    const { classes, account, isLogin, handleLogout } = this.props;

    if (isLogin && account) {
      console.log('login');
      return (
        <div>
          <ContextMenuTrigger id="user_account_contextmenu">
            <div className="topNavigationBar">
              <IconContext.Provider
                value={{
                  color: 'blue',
                  size: '16px',
                  className: 'global-class-name',
                }}
              >
                <MdAccountBox
                  className={isLogin ? 'grey icon' : 'grey icon link'}
                />
                <div className="accountName">
                  {isLogin ? account.getUserId() : 'Login'}
                </div>
              </IconContext.Provider>
              <ContextMenu
                id="user_account_contextmenu"
                className={'contextMenu'}
              >
                <MenuItem className={'contextMenu-item'}>
                  <div onClick={handleLogout}>Logout</div>
                </MenuItem>
              </ContextMenu>
            </div>
          </ContextMenuTrigger>
        </div>
      );
    }

    return (
      <div className="topNavigationBar">
        <IconContext.Provider
          value={{
            color: 'blue',
            size: '16px',
            className: 'global-class-name',
          }}
        >
          <MdAccountBox className={isLogin ? 'grey icon' : 'grey icon link'} />
          <div className="accountName">
            {isLogin ? account.getUserId() : 'Login'}
          </div>
        </IconContext.Provider>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  // classes: PropTypes.object.isRequired,
  // onKeyDown: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  // value: PropTypes.string.isRequired,
};

NavigationBar = withStyles(styles)(NavigationBar);
