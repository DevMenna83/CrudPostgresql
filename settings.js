const appPort = 4000

function getappPort() {
  return appPort
}

//Primeiro parâmetro=nome externo
//Segundo parâmetro=nome interno
module.exports = {
  getappPort: getappPort
}