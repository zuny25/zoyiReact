/* eslint-disable no-console */
const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/api/country', (req, res) => {
  request('http://country.io/names.json', (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
});

app.listen(3030);
console.log('Server running on port %d', 3030);
