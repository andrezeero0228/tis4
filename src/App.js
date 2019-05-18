import React, { Component } from 'react';
import './App.css';
import { TelaLogin } from './telaLogin.js';
import { TelaExportacoes } from './telaExportacoes.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={TelaLogin} />
          <Route id="home" exact path="/home" render={() => <TelaExportacoes />} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
