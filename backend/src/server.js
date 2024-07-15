// Requires
const express = require('express');
const cors = require('cors')

// Using .env file
require('dotenv').config();

// Consts
const app = express();
const port = 4000;
const hostname = '127.0.0.1';

// Setup 
app.use(cors());
app.use(express.json())

/**
 * Insert here your routes.
 * example: 
 * ! import api
 * const api = require('./routes/api');
 * ! use api
 * app.use('/api', api_ruoter);
 */

const appointments_route = require('./routes/appointments');
const pending_appointments_route = require('./routes/pending_appointments');
const professor_router = require('./routes/professors');

app.use('/appointments', appointments_route);
app.use('/professors', professor_router);
app.use('/pending_appointments', pending_appointments_route);


// Default route, returns unauthorized 
app.get('*', (req, res) => {
  res.send({
    code: 300,
    message: "Unauthorized"
  })
})

// Hosting server
app.listen(port, hostname, () => {
  console.log(`Server listening on ${hostname}:${port}`)
})