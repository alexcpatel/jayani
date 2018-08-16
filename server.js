const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path')

const options = {
  key: fs.readFileSync(path.join(__dirname, '/jayani_com.key')),
  cert: fs.readFileSync(path.join(__dirname, '/jayani_com.csr')),
  requestCert: false,
  rejectUnauthorized: false
};

const app = express();

app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build/index.html'));
})

const server = https.createServer(options, app);
server.listen(80);
server.on('listening', () => {
  console.log('Server is listening on port: 80');
});