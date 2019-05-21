import React, { Component } from 'react';
import logo from './logo.jpg';
import txt from './txt.png';
import pdf from './pdf.jpg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { withRouter, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Select from '@material-ui/core/Select';
import { DrawerNavegacao } from './navegacao';
import MenuItem from '@material-ui/core/MenuItem';

export class TelaRelatorios extends Component {
  state = {
    tipoArquivo: '',
    dataArquivo: ''
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleMonta = () => {
    if (this.state.dataArquivo == '') alert('Selecione o período');
    else alert('Montar relatório dos últimos ' + this.state.dataArquivo + ' dias');
  };

  render() {
    return (
      <div>
        <DrawerNavegacao />
        <div className="App">
          <img src={logo} style={{ margin: '20px' }} />
          <h3 style={{ margin: '20px' }}>Montar relatórios do(s) último(s): </h3>
          <Select
            style={{ width: 300, margin: '20px' }}
            value={this.state.dataArquivo}
            onChange={this.handleChange('dataArquivo')}
            inputProps={{
              dataArquivo: 'dataArquivo'
            }}
          >
            <MenuItem value={1}>1 Dia</MenuItem>
            <MenuItem value={3}>3 Dias</MenuItem>
            <MenuItem value={30}>1 Mes</MenuItem>
            <MenuItem value={90}>3 Meses</MenuItem>
            <MenuItem value={100}>Desde o início</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: '20px', width: 200, height: 50 }}
            onClick={e => this.handleMonta()}
          >
            Montar
          </Button>
        </div>
      </div>
    );
  }
}

export default TelaRelatorios;
