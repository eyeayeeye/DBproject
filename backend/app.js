const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db')

// Setting Endpoint (Middleware)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Endpoints
app.get('/', (req, res) => {
  res.send('Hiiiii')
})

app.get('/create', (req, res) => {
  db.query('SELECT * FROM Route_group', (error, result, fields) => {
    // console.log(result)
    res.send(result)
  })
})

module.exports = app
