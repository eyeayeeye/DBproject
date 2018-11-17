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
  db.query('SELECT * FROM Route_group r, Driver d WHERE r.Driver_ID = d.ID', (error, result, fields) => {
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

app.post('/edit', (req, res) => {
  const destination = req.body.Destination
  const rgid = req.body.RGID
  const driver_id = req.body.driver_id
  db.query(
    `UPDATE Route_group SET Destination='${destination}', Driver_ID='${driver_id}' WHERE RGID=${rgid}`,
    (error, result, fields) => {
      if (!error) {
        res.status(200).send({ message: 'success' })
      } else {
        res.status(400).send({ message: 'error' })
      }
    }
  )
})

app.post('/route_group/delete', (req, res) => {
  const rgid = req.body.RGID
  db.query(`DELETE FROM Route_group WHERE RGID='${rgid}'`, (error, result, fields) => {
    if (error) {
      res.status(400).send({ message: 'error' })
    } else res.status(200).send({ message: 'success' })
  })
})

module.exports = app

// update route_group set Destination = '' where RGID  =1;
