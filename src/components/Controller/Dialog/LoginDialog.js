import React, { Component, useState } from 'react';
// material-ui components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// user components
import { PasswordInput } from '../Input/PasswordInput';
import { UsernameInput } from '../Input/UsernameInput';

export default class LoginDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open ? this.props.open : false,
    };

    this.handleClose = this.handleClose.bind(this);
  }

  setOpen = (state) => {
    this.setState({ open: state });
  };

  handleClose = () => {
    this.setOpen(false);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleLogin();
  };

  render() {
    const {
      open,
      parentId,
      username,
      password,
      onChangeAccountInfo,
      handleLogin,
    } = this.props;

    console.log('dialog state:', open);

    return (
      <div>
        <Dialog
          open={open}
          container={() => document.getElementById(parentId)}
          onClose={this.handleClose}
          style={{
            position: 'absolute',
          }}
        >
          <DialogTitle>Login</DialogTitle>
          <form onSubmit={handleLogin}>
            <DialogContent>
              <DialogContentText>
                To Login to this camera, please enter your account here. We will
                send updates occasionally.
              </DialogContentText>
              <UsernameInput
                label="Username"
                name="username"
                value={username || ''}
                fullWidth
                autoFocus
                onKeyDown={(event) =>
                  this.setState({ [event.target.name]: event.target.value })
                }
                onChange={onChangeAccountInfo}
              />
              <PasswordInput
                label="Password"
                name="password"
                value={password || ''}
                fullWidth
                onKeyDown={(event) =>
                  this.setState({ [event.target.name]: event.target.value })
                }
                onChange={onChangeAccountInfo}
              />
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="outlined"
                onClick={this.handleClose}
              >
                Cancel
              </Button>
              <Button
                autoFocus
                type="submit"
                variant="contained"
                color="primary"
                onClick={(event) => {
                  this.setState({ open: false });
                  handleLogin(event);
                }}
              >
                Login
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}
