const repositorio = require('../repositorios/atendimento');
const moment = require('moment');
const axios = require('axios');

class Atendimento {

    constructor() {
        this.dataEhValida = ({ dataAtendimento, dataCriacao }) => moment(dataAtendimento).isSameOrAfter(dataCriacao);
        this.clienteEhValido = ({ tamanhoCpf }) => tamanhoCpf === 11;

        this.valida = (parametros) => {
            this.validacoes.filter((campo) => {
                const { nome } = campo;
                const parametro = parametros[nome];

                return !campo.valido(parametro);
            });
        };

        this.validacoes = [
            {
                nome: 'dataAtendimento',
                valido: this.dataEhValida,
                mensagem: 'A data de agendamento deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: 'O cpf deve ter 11 caracteres'
            }
        ];
    }

    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD h:mm:ss');
        const dataAtendimento = moment(atendimento.dataAtendimento, 'DD/MM/YYYY')
            .format('YYYY-MM-DD h:mm:ss');
        const atendimentoDatado = { ...atendimento, dataCriacao, dataAtendimento };

        const parametros = {
            data: { dataAtendimento, dataCriacao},
            cliente: { tamanhoCpf }
        };

        const erros = this.valida(parametros);
        const contemErros = erros.length;

        if (contemErros) {
            return new Promise((resolve, reject) => reject(erros));
        }

        return repositorio.adiciona(atendimentoDatado)
            .then((resultados) => {
                const id = resultados.insertId;
                return {...atendimento, id};
            });
    }

    lista() {
        return repositorio.lista();
    }

    buscaPorId(id, resp) {
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`

        conexao.query(sql, async (erro, resultados) => {
            const atendimento = resultados[0];
            const cpf = atendimento.cliente

            if (erro) {
                return resp.status(400).json(erro);
            }

            const { data } = await axios.get(`http://localhost:8082/${cpf}`);
            
            atendimento.cliente = data;

            return resp.status(200).json(atendimento);
        });
    }

    altera(id, valores, res) {
        if (valores.dataAtendimento) {
            valores.dataAtendimento = moment(valores.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD h:mm:ss');
        }

        const sql = 'UPDATE atendimentos SET ? WHERE id=?';

        conexao.query(sql, [valores, id], (erro) => {
            if (erro) {
                res.status(400).json(erro);
            }

            res.status(200).json({...valores, id});
        });
    }

    deleta(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id=?';

        conexao.query(sql, id, (erro) => {
            if (erro) {
                return res.status(400).json(erro);
            }

            return res.status(200).json({id});
        });
    }
}

module.exports = new Atendimento;