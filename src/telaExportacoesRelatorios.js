import React, { Component } from 'react';
import logo from './logo.jpg';
import txt from './txt.png';
import pdf from './pdf.jpg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

export class TelaExportacoesRelatorios extends Component {
  state = {
    tipoArquivo: '',
    dataArquivo: ''
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleExport = name => event => {
    this.setState({ ['tipoArquivo']: name });
    if (this.state.dataArquivo == '') alert('Selecione o período');
    else alert(this.state.tipoArquivo + ' ' + this.state.dataArquivo);
  };

  render() {
    return (
      <div>
        <DrawerNavegacao />
        <div className="App">
          <img src={logo} style={{ margin: '20px' }} />
          <h3 style={{ margin: '20px' }}>Exportar relatórios do(s) último(s): </h3>
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
            <MenuItem value={0}>Desde o início</MenuItem>
          </Select>
          <h3 style={{ margin: '20px' }}>Exportar em: </h3>
          <img src={pdf} href onClick={this.handleExport('pdf')} style={{ margin: '20px' }} />
        </div>
      </div>
    );
  }
}

export default TelaExportacoesRelatorios;
