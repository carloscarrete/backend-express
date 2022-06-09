const express = require('express');
const app = express();

const {dbConnection} = require('./database/connect')
require('dotenv').config();

dbConnection();

app.use(express.json());
app.use('/api/v1', require('./routes/auth.route'));

app.get('/', (req, res)=>{
  res.status(200).json({
    ok: true
  });
});

app.listen(5000, (req, res)=>{
  console.log('Started on http://localhost:5000');
});
