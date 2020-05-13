const conexao = require('../infraestrutura/database/conexao');
const uploadDeArquivos = require('../infraestrutura/arquivos/uploadDeArquivos');

class Pet {
    adiciona(pet, res) {
        const query  = 'INSERT INTO pets SET ?';
        
        uploadDeArquivos(pet.imagem, pet.nome, (erro, novoCaminho) => {
            const novoPet = {nome: pet.nome, imagem: novoCaminho};

            if(erro) {
                res.status(400).json({ erro });
            }

            conexao.query(query, novoPet, (erro) => {
                if (erro) {
                    res.status(400).json(erro);
                }
                res.status(200).json(novoPet)
            });
        });

    }
}

module.exports = new Pet();