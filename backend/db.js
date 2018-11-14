const mysql = require('mysql')
const connection = mysql.createConnection({
  port: 3306,
  host: 'localhost',
  user: 'admin',
  password: 'password',
  database: 'driverManagement',
  insecureAuth : true
})

connection.connect()

module.exports = connection 


