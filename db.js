const { Sequelize } = require('sequelize');
var conn = '' //string de conexão

conn = 'postgres://postgres:mennateck@localhost:5432/db_client'

const sequelize = new Sequelize(conn)

module.exports = {
  //external name: internalname
  db: sequelize
}
