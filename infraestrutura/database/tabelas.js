class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criaAtendimentos();
        this.criarPets();
    }

    criaAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20), dataAtendimento datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text)';

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro);
            }

            console.log('Tabela atendimentos criada com sucesso');
        });
    }

    criarPets() {
        const sql = 'CREATE TABLE IF NOT EXISTS pets (id int NOT NULL PRIMARY KEY AUTO_INCREMENT, nome varchar(50) NOT NULL, imagem varchar(255))';

        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
            }

            console.log('Tablea pets foi criada com sucesso!');
        });
    }
}

module.exports = new Tabelas;