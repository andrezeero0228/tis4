import React, { Component } from 'react';
import logo from './assets/logo.jpg';
import { Button, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FirebaseService from './firebaseService/firebaseServirce';
import { createBrowserHistory } from 'history';
import { FireSQL } from 'firesql';
import { Home } from './home.js';
import { Delete, Edit, Link } from '@material-ui/icons';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const fb = new FirebaseService();
const dbRef = fb.db;
let total = 0;
const pergunta_sim = [];
const pergunta_nao = [];

const estados = [
  'AC',
  'AL',
  'AM',
  'AP',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RO',
  'RS',
  'RR',
  'SC',
  'SE',
  'SP',
  'TO'
];
const contagemPorEstados = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];
const fireSQL = new FireSQL(dbRef);

fireSQL.query('SELECT * FROM usuario ').then(documents => {
  documents.forEach(doc => {
    total++;
  });

  teste(total);
});

for (let i = 0; i < 27; i++) {
  let aux = 0;
  fireSQL.query('SELECT * FROM usuario WHERE estado ="' + estados[i] + '"').then(documents => {
    documents.forEach(doc => {
      aux++;
    });

    contaEstados(aux, i);

    aux = 0;
  });
}

function teste(cont) {
  console.log(cont);
  for (let i = 0; i < 6; i++) {
    let respostaSim = 0;
    let respostaNao = 0;
    fireSQL.query('SELECT * FROM usuario WHERE pergunta_' + (i + 1) + '="sim"').then(documents => {
      documents.forEach(doc => {
        respostaSim++;
      });

      respostaNao = total - respostaSim;
      respostas(respostaSim, respostaNao, i);
    });
  }
}

function respostas(sim, nao, i) {
  pergunta_sim[i] = sim;
  pergunta_nao[i] = nao;
}

function contaEstados(contagem, i) {
  contagemPorEstados[i] = contagem;
  console.log(estados[i] + ' Ccntagem: ' + contagemPorEstados[i]);
}

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
    console.log(pergunta_sim);
    if (this.state.login === 'andrea' && this.state.senha === 'andrea') history.replace('/home');
    else alert('Usuário e/ou senha incorreto(s)!!!');
  };

  render() {
    return (
      <div className="App">
        <h1 style={{ margin: '20px' }}>Bem Vindo(a)!</h1>
        <img src={logo} style={{ margin: '20px' }} alt={'logo'} />
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
            href="/home"
          >
            Entrar
          </Button>
        </form>
      </div>
    );
  }
}

export default TelaLogin;
