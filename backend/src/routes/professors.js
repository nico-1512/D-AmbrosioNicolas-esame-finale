// Require database client
const { getClient } = require('../db/get-client');

// Requires and Imports
const express = require('express');

// Declarations
const router = express.Router();
const table_name = "professor"

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

router.get('/:id', async (req, res) => {
  const client = await getClient();
  const query = {
    text: `SELECT * FROM ${table_name} WHERE id = $1`,
    values: [req.params.id]
  }
  const query_result = await client.query(query);
  res.send(query_result.rows)
  await client.end()
})

router.get('/meeting_dates/:id', async (req, res) => {
  const client = await getClient();
  const query = {
    text: `SELECT meeting_dates FROM ${table_name} WHERE id = $1`,
    values: [req.params.id]
  }

  const query_result = await client.query(query);
  console.log(query_result.rows[0].meeting_dates);
  res.send(query_result.rows[0].meeting_dates)
  await client.end()
})


// Export 
module.exports = router;