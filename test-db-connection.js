const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
});

async function testConnection() {
  console.log('Attempting to connect to:', (process.env.DIRECT_URL || process.env.DATABASE_URL).split('@')[1]);
  try {
    await client.connect();
    console.log('Connected successfully!');
    const res = await client.query('SELECT current_database(), current_schema()');
    console.log('Database context:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Connection error:', err.message);
    process.exit(1);
  }
}

testConnection();
