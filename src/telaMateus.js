import React, {Component} from 'react';
import DataGrid, {Column, Export, GroupPanel, Selection} from 'devextreme-react/data-grid';
import FirebaseService from './firebaseService/firebaseServirce'
import {FireSQL} from "firesql";


const fb = new FirebaseService();
const dbRef = fb.db;
let total = 0;
const estados = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"];
const fireSQL = new FireSQL(dbRef);


const estado_inicial = {

    contagemPorEstados: null,
    pergunta_sim: null,
    pergunta_nao: null,
    base: null,
    contador: 0,
    teste: null,


};


export class telaMateus extends Component {
    constructor(props) {


        super(props);
        this.state = {
            ...estado_inicial,

        };


    }

    geraTotal() {
        let beste = [];
        fireSQL.query('SELECT * FROM usuario ').then(documents => {
            documents.forEach(doc => {
                total++;
                beste.push(doc);
            });
            this.setState({
                contador: total,
                teste: beste
            });


        });
    }

    geraTotalPorEstado() {
        let auxArray = {
            AC: 0,
            AL: 0,
            AM: 0,
            AP: 0,
            BA: 0,
            CE: 0,
            DF: 0,
            ES: 0,
            GO: 0,
            MA: 0,
            MT: 0,
            MS: 0,
            MG: 0,
            PA: 0,
            PB: 0,
            PR: 0,
            PE: 0,
            PI: 0,
            RJ: 0,
            RN: 0,
            RO: 0,
            RS: 0,
            RR: 0,
            SC: 0,
            SE: 0,
            SP: 0,
            TO: 0
        };
        for (let i = 0; i < 27; i++) {
            let aux = 0;
            fireSQL.query('SELECT * FROM usuario WHERE estado ="' + estados[i] + '"').then(documents => {
                documents.forEach(doc => {
                    aux++;
                });
                auxArray[estados[i]] = aux;

                if (i === 26) {
                    this.setState({contagemPorEstados: auxArray});
                }
            })
        }
    }

    geraTotalSimNao() {
        let respostasSim = [];
        let respostasNao = [];
        let sim = 0;
        let nao = 0;
        for (let i = 0; i < 6; i++) {
            fireSQL.query('SELECT * FROM usuario WHERE pergunta_' + (i + 1) + '="sim"').then(documents => {
                documents.forEach(doc => {
                    sim++;
                });
                nao = total - sim;
                respostasSim[i] = sim;
                respostasNao[i] = nao;
                sim = 0;
                nao = 0;
                if (i === 5) {
                    this.setState({
                        pergunta_sim: respostasSim,
                        pergunta_nao: respostasNao,
                    });
                }

            })


        }


    }


    componentDidMount() {
        this.geraTotal();
        this.geraTotalPorEstado();
        this.geraTotalSimNao();


    }


    render() {
        console.log(this.state);
        const {contador} = this.state;


        return <div className="App">
            <h1 style={{margin: '20px'}}>Contador </h1>
            <h1> {contador}</h1>

            <div>
                <DataGrid
                    id={'gridContainer'}
                    dataSource={this.state.teste}
                    showBorders={true}>
                    <Export enabled={true} fileName={'dadoss'} allowExportSelectedData={true}/>
                    <Selection mode={'multiple'}/>
                    <GroupPanel visible={true}/>
                    <Column dataField={'pergunta_1'} width={60}/>
                    <Column dataField={'pergunta_2'}/>
                    <Column dataField={'pergunta_4'}/>
                    <Column dataField={'pergunta_5'}/>
                    <Column dataField={'pergunta_6'}/>
                    <Column dataField={'pergunta_7'} width={130}/>
                </DataGrid>
            </div>


        </div>;
    }


}



