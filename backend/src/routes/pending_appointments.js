// Require database client
const { getClient } = require('../db/get-client');

// Requires and Imports
const express = require('express');

// Declarations
const router = express.Router();
const table_name = "PendingAppointment"

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

router.get('/:professor_id', async (req, res) => {
  const client = await getClient();
  const query = {
    text: `SELECT * FROM ${table_name} WHERE professor_id = $1`,
    values: [req.params.professor_id]
  }
  const query_result = await client.query(query);
  res.send(query_result.rows)
  await client.end()
})


router.post('/', async (req, res) => {
  const client = await getClient();

  const body = req.body;

  const query = {
    text: `UPDATE ${table_name} SET pending=False, state=$1 WHERE appointment_id = $2 AND professor_id = $3 RETURNING appointment_id, state;`,
    values: [body.state, body.appointment_id, body.professor_id]
  }

  const query_result = await client.query(query);
  res.send(query_result.rows)
  await client.end()
})

// Export 
module.exports = router;