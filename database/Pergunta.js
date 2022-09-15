const Sequelize = require('sequelize');
const conection = require('./database');


//aqui eu vou ta definindo um model
const Pergunta = conection.define('Perguntas', { 
    titulo:{                                        //aqui vou esta defininfo o campo da minha tabela
        type: Sequelize.STRING,                     //aqui vou está defininfo o tipo
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// esse codígo vai sicronizar o codigo a cima com o meu banco de dados
// e se não existir uma tabela chamada pergunta então ele vai criar, e o "false" vai ta evitando de criar 2 tabela iguais.
// o then vai ser executado quando a tabela for criada
Pergunta.sync({force: false}).then(() => {})

//responsavel por importa o codígo que está const "Pergunta"
module.exports = Pergunta; 