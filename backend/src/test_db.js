process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log('Attempting to connect to the database...');
console.log('Using connection string from POSTGRES_URL_NON_POOLING');

const client = new Client({
  connectionString: process.env.POSTGRES_URL_NON_POOLING,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect(err => {
  if (err) {
    console.error('Connection error:', err.message);
    console.error('Error code:', err.code);
  } else {
    console.log('Connected successfully!');
  }
  client.end();
});
