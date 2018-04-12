require('babel-register')
module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8092,
      network_id: '*',
      gas: 470000
    }
  }
}