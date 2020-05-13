const customExpress = require('./config/custom-express');
const conexao = require('./infraestrutura/database/conexao');
const tabelas = require('./infraestrutura/database/tabelas');

conexao.connect(erro => {
    if(erro) {
      console.log('Falha na conexão com o BD');
    } else {
      console.log('conexão do BD realizada com sucesso!');
      
      tabelas.init(conexao);
      
      const app = customExpress();
      
      app.listen(3000, () => console.log('server runing on 3000'));
    }
});

