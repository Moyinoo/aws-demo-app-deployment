const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'mydb.cfiuqqyyuzoi.us-east-2.rds.amazonaws.com',
  database: 'my-db',
  password: 'Hemovic11*',
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // Avoid in production, use a valid SSL certificate
  },
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  // Consider handling errors more gracefully than exiting the process in a production environment
  process.exit(-1);
});

const getDateTime = async () => {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT NOW() as now;');
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
    // Handle errors here, either by logging, notifying, or implementing recovery strategies
  } finally {
    client.release();
  }
};

module.exports = { getDateTime };
