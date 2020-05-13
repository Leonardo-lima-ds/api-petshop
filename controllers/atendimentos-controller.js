const atendimentos = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, resp) => {
        atendimentos.lista()
            .then(resultados => resp.json(resultados))
            .catch(erros => resp.status(400).json(erros));
    });

    app.get('/atendimentos/:id', (req, resp) => {
        const id = parseInt(req.params.id);
        atendimentos.buscaPorId(id, resp);
    });

    app.post('/atendimentos', (req, resp) => {
        const dados_atendimento = req.body;

        atendimentos.adiciona(dados_atendimento)
            .then((atendimentoCadastrado) => {
                resp.status(201).json(atendimentoCadastrado);
            })
            .catch((erros) => {
                resp.status(400).json(erros);
            });
    });

    app.patch('/atendimentos/:id', (req, resp) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        atendimentos.altera(id, valores, resp);
    });

    app.delete('/atendimentos/:id', (req, resp) => {
        const id = parseInt(req.params.id);

        atendimentos.deleta(id, resp);
    });
}