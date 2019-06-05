import React, {Component} from 'react';
import './App.css';
import {TelaLoginForm} from './telaLogin.js';
import {TelaExportacoes} from './telaExportacoes.js';
import {TelaExportacoesRelatorios} from './telaExportacoesRelatorios.js';
import {TelaRelatorios} from './telaRelatorios.js';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route path="/" exact component={TelaLoginForm}/>
          <Route id="home" exact path="/home" render={() => <TelaExportacoes />} />
          <Route id="exporta" exact path="/exporta" render={() => <TelaExportacoesRelatorios />} />
          <Route id="relatorio" exact path="/relatorio" render={() => <TelaRelatorios />} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
