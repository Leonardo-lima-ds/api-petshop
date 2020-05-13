const fs = require('fs');
const path = require('path');

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const tiposValidos = ['jpg','jpeg','png'];

    const novoCaminho = `./assets/imagens/${nomeDoArquivo}`;

    const tipo = path.extname(caminho);
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1;

    if(!tipoEhValido) {
        const erro = "Tipo da imagem é inválido!";
        console.log('Erro! Tipo da imagem não suportado.');
        callbackImagemCriada(erro);
    }
    else {
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImagemCriada(false, novoCaminho));
    }

}