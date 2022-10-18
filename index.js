const express = require('express');
const server = express()
server.use(express.json())
// Query params = ?name=NodeJS
// Route params = /curso/2
// Request Body = {node: 'NodeJs, tipo 'Backend'}

const cursos = ['Nodejs', 'JavaScript', 'ReactNative']


//Middleware Global
server.use((req, res, next) => {
  console.log(`URL chamada: ${req.url} `);
  return next();
})
    //Funções Middlewares;
function checkCurso(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({
      error:
        "Nome do curso é obrigatorio"
    })
  }
  return next();
}

function checkindexCurso(req,res,next){
  const curso = cursos[req.params.index];
  if(!curso){
    return res.status(400).json({error:
    "O Curso não existe."})
  }
req.curso = curso

  return next()
}

////////////// Requisição Get
server.get('/curso', (req, res) => {

  return res.json(cursos)
})


server.get('/curso/:index',checkindexCurso, (req, res) => {
  //Query params
  // const nome = req.query.nome
  //Route params
  // const { index } = req.params

  return res.json(req.curso)

})
//////////////// Requisição POST

server.post('/curso', checkCurso, (req, res) => {
  const { name } = req.body
  cursos.push(name)
  return res.json(cursos)


})


//////////////// Requisição PUT

server.put('/curso/:index', checkCurso,checkindexCurso, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name

  return res.json(cursos)

})

/////////////////////// Requisiçao Delete

server.delete('/curso/:index',checkindexCurso, (req, res) => {
  const { index } = req.params
  /// função javascript para remover dado de um array.
  cursos.splice(index, 1)

  return res.json(cursos)

})


//////////////// Secret Section
server.all('/curso2', (req, res, next) => {
  console.log('Accessing the secret section ...')
  res.json({ node: "JavaScript" })
  next() // pass control to the next handler
})






server.listen(3000)