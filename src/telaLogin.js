import React, { Component } from 'react';
import logo from './logo.jpg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { withRouter, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export class TelaLogin extends Component {
  state = {
    login: '',
    senha: '',
    showPassword: false
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  fazLogin = () => {
    const history = createBrowserHistory();
    if (this.state.login === 'andrea' && this.state.senha === 'andrea') history.replace('/home');
    else alert('Usuário e/ou senha incorreto(s)!!!');
  };

  render() {
    return (
      <div className="App">
        <h1 style={{ margin: '20px' }}>Bem Vindo(a)!</h1>
        <img src={logo} style={{ margin: '20px' }} />
        <form onSubmit="return false;">
          <div>
            <TextField
              id="standard-name"
              label="Login"
              margin="normal"
              value={this.state.login}
              onChange={this.handleChange('login')}
              style={{ width: 300, margin: '20px' }}
            />
          </div>
          <div>
            <TextField
              id="standard-password-input"
              label="Senha"
              type={this.state.showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              margin="normal"
              value={this.state.senha}
              onChange={this.handleChange('senha')}
              style={{ width: 300, margin: '20px' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '20px', width: 200, height: 50 }}
            //onClick={e => console.log(this.state)}
            onClick={e => this.fazLogin()}
          >
            Entrar
          </Button>
        </form>
      </div>
    );
  }
}

export default TelaLogin;
