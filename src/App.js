import React, { Component } from 'react';
import './App.css';
import { TelaLogin } from './telaLogin.js';
import { TelaExportacoes } from './telaExportacoes.js';
import { TelaExportacoesRelatorios } from './telaExportacoesRelatorios.js';
import { TelaRelatorios } from './telaRelatorios.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={TelaLogin} />
          <Route id="home" exact path="/home" render={() => <TelaExportacoes />} />
          <Route id="exporta" exact path="/exporta" render={() => <TelaExportacoesRelatorios />} />
          <Route id="relatorio" exact path="/relatorio" render={() => <TelaRelatorios />} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
