//https://sequelize.org/
//Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server
const { Model, DataTypes } = require('sequelize');
const {getappPort} = require('./settings')

class User extends Model {}

const {db} = require('./db')

//Definição da estrutura da model
User.init({
  nome:        {type: DataTypes.STRING(50), allowNull: false},
  telefone:    {type: DataTypes.STRING(15), allowNull: true},
  email:       {type: DataTypes.STRING(25), allowNull: true},
  logradouro:  {type: DataTypes.STRING(60), allowNull: true},
  numero:      {type: DataTypes.STRING(10), allowNull: true},
  complemento: {type: DataTypes.STRING(40), allowNull: true},
  bairro:      {type: DataTypes.STRING(40), allowNull: true},
  cidade:      {type: DataTypes.STRING(50), allowNull: true},
  uf:          {type: DataTypes.STRING(2),  allowNull: true}
}, { sequelize: db, modelName: 'user' });

//sincroniza esta model
User.sync();

//retorna todos os usuários
async function getUsers() {
  return User.findAll({
    //attributes: ['nome']
  })
}

async function getuserById(id) {
  return User.findByPk(id);
}

async function getuserByNome(filtercontent) {
  const { Op } = require("sequelize");
  return User.findAll({
    //attributes: ['nome']
    where: {
      nome: {[Op.substring]: filtercontent}
    }
  })
}

async function deleteuserById(idtoDelete) {
  User.destroy({
    where: {id: idtoDelete}
  }).then( function(rowDeleted) {
    if (rowDeleted === 1){
      return true
    } else {
      return false
    }
  }).catch(function(e) {
    return false
  })
}

async function createUser(userObj) {
  if (!userObj || !userObj.nome) {
    throw new Error('Usuário inválido')
  }
  
  const userFound = await User.findAll({
    where: {
      nome: userObj.nome
    }
  })

  if (userFound && userFound.length > 0) {
    throw new Error('Usuário já existe com este nome')
  }
  
  const newUser = await User.create({
    nome:        userObj.nome,
    telefone:    userObj.telefone,
    email:       userObj.email,
    logradouro:  userObj.logradouro,
    numero:      userObj.numero,
    complemento: userObj.complemento,
    bairro:      userObj.bairro,
    cidade:      userObj.cidade,
    uf:          userObj.uf  
  })
  
  return newUser
}

async function editUser(userObj) {
  if (!userObj || !userObj.nome || !userObj.id) {
    throw new Error('Usuário inválido')
  }
  const currUser = await User.update({
    nome:        userObj.nome,
    telefone:    userObj.telefone,
    email:       userObj.email,
    logradouro:  userObj.logradouro,
    numero:      userObj.numero,
    complemento: userObj.complemento,
    bairro:      userObj.bairro,
    cidade:      userObj.cidade,
    uf:          userObj.uf},
  {where: {id: userObj.id}}
  )

  return currUser
}


module.exports = {
  getUsers: getUsers,
  createUser: createUser,
  getuserById: getuserById,
  getuserByNome: getuserByNome,
  deleteuserById: deleteuserById,
  editUser: editUser
}