import React, { Component } from 'react';
import logo from './assets/logo.jpg';
import txt from './txt.png';
import excel from './assets/excel.jpg';

import Select from '@material-ui/core/Select';
import { DrawerNavegacao } from './navegacao';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { createBrowserHistory } from 'history';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart, Pie, Sector } from 'recharts';

import SaveIcon from '@material-ui/icons/Save';
import { Button, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { Chart, ArgumentAxis, ValueAxis, LineSeries } from '@devexpress/dx-react-chart-material-ui';
const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{` ${value} Pessoas`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const data = [
  {
    name: 'PRG_1',
    Sim: 20,
    Nao: 3,
    amt: 2400
  },
  {
    name: 'PRG_2',
    Sim: 18,
    Nao: 5,
    amt: 2400
  },
  {
    name: 'PRG_4',
    Sim: 0,
    Nao: 23,
    amt: 2400
  },
  {
    name: 'PRG_5',
    Sim: 12,
    Nao: 11,
    amt: 2400
  },
  {
    name: 'PRG_6',
    Sim: 10,
    Nao: 13,
    amt: 2400
  },
  {
    name: 'PRG_7',
    Sim: 7,
    Nao: 16,
    amt: 2400
  }
];
const data2 = [
  { name: 'Sul', value: 7 },
  { name: 'Sudeste', value: 10 },
  { name: 'Norte', value: 1 },
  { name: 'Nordeste', value: 3 },
  { name: 'Centro-Oeste', value: 2 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A23555'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export class TelaExportacoes extends Component {
  state = {
    dados: [],
    dataArquivo: ''
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleExport = name => event => {
    //  this.setState({ ['tipoArquivo']: name });
    // if (this.state.dataArquivo == '') alert('Selecione o período');
    // else alert(this.state.tipoArquivo + ' ' + this.state.dataArquivo);
  };

  state = {
    activeIndex: 0
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };
  fazLogin = () => {
    const history = createBrowserHistory();
    history.replace('/home');
  };

  render() {
    let um = [];
    um = this.props.pergunta_sim;
    let dados2 = [];

    if (um !== null) {
      // for (let i = 0; i < um.length; i++) dados2.push(um[i]);
      this.setState({ dados: um });
    }
    // if (dados2.length === 6) {
    //   this.setState({ dados: dados2 });
    // }
    // console.log(this.state.dados);

    return (
      <div>
        <div className="App">
          <div style={{ left: '-400px', position: 'relative' }}>
            <h3>Quantidade de Sim e Não por pergunta</h3>
            <BarChart
              style={{ left: '400px' }}
              width={600}
              height={500}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Sim" fill="#8884d8" />
              <Bar dataKey="Nao" fill="#82ca9d" />
            </BarChart>
          </div>
          <h3 style={{ left: '900px', top: '0px', position: 'absolute' }}>
            Quantidade de respostas por região
          </h3>
          <PieChart width={600} height={600} style={{ left: 750, bottom: 500 }}>
            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape}
              data={data2}
              cx={300}
              cy={300}
              innerRadius={90}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={this.onPieEnter}
            />
          </PieChart>
          <Button
            variant="outlined"
            style={{ right: '500px', top: '550px', position: 'absolute' }}
            onClick={e => this.fazLogin()}
            href="/home"
          >
            <p>Voltar para o menu</p>
          </Button>
        </div>
      </div>
    );
  }
}

export default TelaExportacoes;
