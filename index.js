const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require('./database/database');
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//database
connection.authenticate()
  .then(()=>{
    console.log("Connexao feita com o banco de dados!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  })

//estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');
app.use(express.static('public')) //Dizendo para o express que você quer utilizar arquivos estaticos
//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Rotas */

//Pedindo dois pamentros obrigatorios nome e lang e redenrizando os valores com ejs
app.get("/", (req, res) => {

  Pergunta.findAll({raw: true, order: [
    ['id', 'desc'] // ordenando decrecente
  ]}).then(pergunta => {
    console.log(pergunta);
    res.render("index", {pergunta: pergunta});
  }); // SELECT * FROM pergunta

  
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {

  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(()=> {
    res.redirect('/');
  })

});

app.get("/pergunta/:id", (req, res) => {

  var id = req.params.id;

  Pergunta.findOne({
    where: {id: id}
  }).then(pergunta => {
    if(pergunta != undefined){
      Resposta.findAll({
        where: {perguntaId: pergunta.id},
        order:[
          ['id', 'DESC']
        ] 
      }).then(respostas => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas
        });
      })
      
    }
    else
      res.redirect("/");
  });
});

app.post("/responder", (req, res)=> {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;

  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(()=> {
    res.redirect("/pergunta/"+perguntaId);
  })

})

app.listen(8080,()=>{console.log("App rodando!");});