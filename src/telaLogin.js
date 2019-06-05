import React, {Component} from 'react';
import logo from './assets/logo.jpg';

import {Button, TextField} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FirebaseService from './firebaseService/firebaseServirce'
import {createBrowserHistory} from "history";


const fb = new FirebaseService();


const estado_inicial = {
    email: '',
    senha: '',
    showPassword: false
};


export class TelaLoginForm extends Component {

    constructor(props) {


        super(props);
        this.state = {...estado_inicial};


    }

    handleChange = email => event => {
        this.setState({[email]: event.target.value});
    };
    handleClickShowPassword = () => {
        this.setState(state => ({senha: !state.showPassword}));
  };


    onSubmit = event => {
        const {email, senha} = this.state;

        console.log(email);
        console.log(senha);


        debugger;

        fb.login_email(email, senha);


        if (fb.getUser) {
            const history = createBrowserHistory();
            history.replace('/home');

        }
        console.log(fb.getUser());


        event.preventDefault();
    };











  render() {
    return (
      <div className="App">
        <h1 style={{ margin: '20px' }}>Bem Vindo(a)!</h1>
          <img src={logo} style={{margin: '20px'}} alt="ModerAlocol"/>
          <form onSubmit={this.onSubmit}>
          <div>
            <TextField
                id="email"
                label="E-mail"
                margin="normal"
                value={this.state.email}
                onChange={this.handleChange('email')}
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
              onClick={e => console.log(this.state)}
              type="submit">
            Entrar
          </Button>
        </form>
      </div>
    );
  }
}


export default TelaLoginForm;

