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

app.get('/all', (req, res) => {
  db.query('SELECT * FROM Route_group', (error, result, fields) => {
    if (!error) res.status(200).send(result)
    else res.status(400).send({ message: 'error' })
  })
})

app.post('/create', (req, res) => {
  const driverID = req.body.ID
  const destination = req.body.destination
  db.query(
    `INSERT INTO Route_group (Destination, Driver_ID) VALUES ('${destination}', '${driverID}')`,
    (error, result, fields) => {
      if (!error) res.status(200).send(result)
      else res.status(400).send({ message: 'error' })
    }
  )
})

app.get('/drivers', (req, res) => {
  db.query('SELECT ID, Name FROM Driver', (error, result, fields) => {
    if (!error) res.status(200).send(result)
    else res.status(400).send({ message: 'error' })
  })
})

module.exports = app
