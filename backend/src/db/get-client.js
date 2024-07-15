const { Client } = require('pg');

require('dotenv').config();

module.exports.getClient = async () => {
  const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
  } = process.env

  const client = new Client({
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: 5432,
    database: POSTGRES_DB,
  })

  await client.connect();
  return client;
};