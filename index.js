const express = require('express')
const {getUsers, createUser, getuserById, getuserByNome, deleteuserById, editUser} = require('./user')
const app = express()
const {getappPort} = require('./settings')

var {db} = require('./db')

app.use(express.json())

//GET

//Primeiro parámetro é o endereço e segundo é a pasta que está respondendo. Por convenção vai procurar por index.html
app.get('/', express.static('public'))

app.get('/api/user', async (request, response) => {
  const filterbyName = request.query.nome;
  if (filterbyName == '' || filterbyName === undefined) {
    response.json(await getUsers())
  } else {
    response.json(await getuserByNome(filterbyName))
  }
})

app.get('/api/user/:id', async (request, response) => {
  response.json(await getuserById(request.params.id))
})

app.delete('/api/user/:id', async (request, response) => {
  response.json(await deleteuserById(request.params.id))
})

//PUT
app.put('/api/user', async (request, response) => {
  try {
    response.json(await editUser(request.body))
  } catch (e) {
    response.json({err: e.toString()})
  }
})

//POST
app.post('/api/user', async (request, response) => {
  try {
    response.json(await createUser(request.body))
  } catch (e) {
    response.json({err: e.toString()})
  }
})

//LISTEN

app.listen(getappPort(), () => {
  db.sync().then(() => {
    console.log('migrations sincronizadas')
  })
  console.log('app ouvindo na porta '+ getappPort())
})
