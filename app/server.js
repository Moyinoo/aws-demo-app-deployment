const express = require('express');
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/profile-picture', (req, res) => {
  const img = fs.readFileSync(path.join(__dirname, 'images/profile-1.jpg'));
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// Database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'mydb.cfiuqqyyuzoi.us-east-2.rds.amazonaws.com',
  database: 'mydb',
  password: 'Hemovic11*',
  port: 5432, // PostgreSQL default port
});

app.post('/update-profile', async (req, res) => {
  const userObj = req.body;
  const userId = 1; // Change this to the desired user ID

  try {
    const client = await pool.connect();
    const query = 'UPDATE users SET ... WHERE userid = $1'; // Update this query accordingly

    await client.query(query, [userId, /* Add your update values here */]);
    client.release();
    
    // Send response
    res.send(userObj);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error updating profile');
  }
});

app.get('/get-profile', async (req, res) => {
  const userId = 1; // Change this to the desired user ID

  try {
    const client = await pool.connect();
    const query = 'SELECT * FROM users WHERE userid = $1'; // Modify this query

    const result = await client.query(query, [userId]);
    const response = result.rows[0] || {};

    client.release();

    // Send response
    res.send(response);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error fetching profile');
  }
});

app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
