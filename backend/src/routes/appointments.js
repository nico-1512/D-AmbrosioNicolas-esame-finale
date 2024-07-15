// Require database client
const { getClient } = require('../db/get-client');

// Requires and Imports
const express = require('express');

// Declarations
const router = express.Router();
const table_name = "appointment"

// APIs
router.get('/', async (req, res) => {
  const client = await getClient();
  const query = {
    text: `SELECT * FROM ${table_name}`,
  }
  const query_result = await client.query(query);
  res.send(query_result.rows)
  await client.end()
})

router.post('/', async (req, res) => {
  const client = await getClient();

  const body = req.body;

  const professor_dates = await client.query({
    text: `SELECT meeting_dates FROM Professor WHERE id = $1;`,
    values: [body.professor_id]
  })

  const dates = professor_dates.rows[0].meeting_dates;

  const input_date = new Date(body.date)//.toLocaleString();


  const found = dates.reduce((accumulator, current_date) => {
    current_date = new Date(current_date)

    console.log(current_date.toISOString(), input_date.toISOString(), current_date.toISOString() == input_date.toISOString());

    if (current_date.toISOString() === input_date.toISOString()) {
      return true;
    }
    return accumulator;
  }, false);

  console.log(found);

  if (found) {
    const appointment_query = {
      text: `INSERT INTO ${table_name} (description, date, professor_id, student_id) VALUES ($1, $2, $3, $4) RETURNING id`,
      values: [body.description, new Date(body.date), body.professor_id, body.student_id]
    }

    const appointment_query_result = await client.query(appointment_query);

    const pending_appointment_query = {
      text: `INSERT INTO PendingAppointment (professor_id, appointment_id, date) VALUES ($1, $2, $3)`,
      values: [body.professor_id, appointment_query_result.rows[0].id, new Date(body.date)]
    }

    await client.query(pending_appointment_query);
    res.send(appointment_query_result.rows)
  } else {
    res.send({
      code: 404,
      message: "Date not found in professor dates"
    })
  }
  await client.end()
})

// Export 
module.exports = router;