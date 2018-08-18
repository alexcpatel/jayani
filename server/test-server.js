const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const request = require('request');
const dotenv = require("dotenv");

const listId = '01d4e26bc1';
const env = dotenv.config({ path: path.join(__dirname, '../.env') });
const MAILCHIMP_API_KEY = env.parsed.MAILCHIMP_API_KEY

const app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.post('/data', (req, res) => {
  res.sendFile(path.join(__dirname, `../public/data/data.json`));
});

app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  const data = {
    email_address: email,
    status: 'subscribed',
  };

  if (!email) {
    res.json({ error: 'Email is required' });
    return;
  }

  new Promise((resolve, reject) => {
    request.post(
      {
        uri: `https://us19.api.mailchimp.com/3.0/lists/${listId}/members/`,
        headers: {
          Accept: 'application/json',
          Authorization: `Basic ${Buffer.from(`apikey:${MAILCHIMP_API_KEY}`).toString('base64')}`,
        },
        json: true,
        body: data,
      },
      (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      },
    );
  })
    .then(response => {
      if (response.status === 'subscribed') {
        res.json({ subscribed: 1 })
      } else {
        res.json({ error: response.detail })
      }
    })
    .catch(err => {
      res.json({ error: err.message || err.toString() });
    });
});

const server = http.createServer(app);
server.listen(80);
server.on('listening', () => {
  console.log('Server is listening on port: 80');
});
