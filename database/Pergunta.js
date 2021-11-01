const Sequelize = require("sequelize");
const connection = require("./database");
const Pergunta = connection.define('pergunta', {
  titulo:{
    type: Sequelize.STRING,
    allowNuLL: false
  },
  descricao:{
    type: Sequelize.TEXT,
    allowNuLL: false
  }
});

Pergunta.sync({force: false}).then(()=> {}); //Sincronizar no banco de dados caso a tabela não exista

module.exports = Pergunta;