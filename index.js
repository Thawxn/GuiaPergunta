//responsavel por receber e interpretar e retorna o codígo
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const conection = require('./database/database');
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');

//Database
conection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com o banco de dados!')
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })


// Estou dizendo para o Express usar o ejs com view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Comando que vai permitir que a pessoa envie os dados do formulario, e o body-parser vai traduzir esses dados  em uma estrutura JavaScript
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


//Rotas
app.get('/', function(req,res){
    Pergunta.findAll({ raw: true, order:[             //responsavel por lista as perguntas nessa página ("/"), "Pergunta" porque é onde está o model, o "raw:true" ele só vai atrás dos dados e nada mais, e o orde server para ordena em id decrescente
        ['id','DESC']                                //o "findAll" é responsavel por procurar todas as perguntas da tabela e retorna para me, as perguntas vão ser mandados para dentro do then.
    ]}).then(perguntas =>{                             
        console.log(perguntas);                        
        res.render('index',{
            perguntas: perguntas
        })
    });
})

app.get('/perguntar', function(req,res){
    res.render('perguntar')
})

app.post('/salvarpergunta', function(req,res){
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    });
})

app.get('/pergunta/:id', function(req,res){
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then( pergunta => {
        if(pergunta != undefined){
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [ ['id', 'DESC']]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        } else{
            res.redirect('/');
        }
    })
})

app.post('/responder', function(req,res){
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    })
});

app.listen(8000, ()=>{console.log("Está funcionando!")});