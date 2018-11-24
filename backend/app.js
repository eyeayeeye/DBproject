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
  db.query('SELECT * FROM Route_group r', (error, result, fields) => {
    if (!error) res.status(200).send(result)
    else res.status(400).send({ message: 'error' })
  })
})

app.post('/create', async (req, res) => {
  const driverID = req.body.ID
  const destination = req.body.destination
  db.query(`SELECT * FROM Route_group WHERE Driver_ID='${driverID}'`, (error, result, fields) => {
    if (error || result.length!==0) {
      res.status(400).send({ message: 'error' })
    } else {
      db.query(
        `INSERT INTO Route_group (Destination, Driver_ID) VALUES ('${destination}', '${driverID}')`,
        (error, result, fields) => {
          if (!error) res.status(200).send(result)
          else res.status(400).send({ message: 'error' })
        }
      )
    }
  })
})

app.get('/drivers', (req, res) => {
  db.query(`SELECT ID, Name, Surname FROM Driver `, (error, result, fields) => {
    if (!error) res.status(200).send(result)
    else res.status(400).send({ message: 'error' })
  })
})

app.get('/students', (req, res) => {
  db.query(`SELECT * FROM Student `, (error, result, fields) => {
    if (!error) res.status(200).send(result)
    else res.status(400).send({ message: 'error' })
  })
})

app.post('/edit', (req, res) => {
  const destination = req.body.Destination
  const rgid = req.body.RGID
  let driver_id = `'${req.body.driver_id}'`
  if (driver_id == "'null'") driver_id = 'NULL'
  db.query(
    `UPDATE Route_group SET Destination='${destination}', Driver_ID=` +
      driver_id +
      ` WHERE RGID=${rgid} AND NOT EXISTS (SELECT * FROM (SELECT * FROM Route_group) AS a WHERE a.Driver_ID=` +
      driver_id +
      `)`,
    (error, result, fields) => {
      if (error || result.affectedRows == 0) {
        res.status(400).send({ message: 'error' })
      } else {
        res.status(200).send({ message: 'success' })
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

app.post('/route_group/students', (req, res) => {
  const rgid = req.body.RGID
  db.query(`SELECT * FROM Student WHERE RGID='${rgid}'`, (error, result, fields) => {
    if (error) {
      res.status(400).send({ message: 'error' })
    } else res.status(200).send(result)
  })
})

app.post('/route_group/delete-student', (req, res) => {
  const rgid = req.body.RGID
  const student_id = req.body.student_id
  db.query(`UPDATE Student set RGID='${rgid}' WHERE ID='${student_id}'`, (error, result, fields) => {
    if (error) {
      res.status(400).send({ message: 'error' })
    } else res.status(200).send({ message: 'success' })
  })
})

app.get('/get-student', (req, res) => {
  db.query('SELECT ID, Name,Surname FROM Student', (error, result, fields) => {
    if (!error) res.status(200).send(result)
    else res.status(400).send({ message: 'error' })
  })
})

app.post('/add-student', (req, res) => {
  const rgid = req.body.rgid
  const ID = req.body.ID
  console.log(rgid, ID)
  db.query(`UPDATE Student SET RGID='${rgid}' WHERE ID= '${ID}'`, (error, result, fields) => {
    if (!error) res.send(result)
    else res.send({ message: 'error' })
  })
})

module.exports = app

// update route_group set Destination = '' where RGID  =1;
