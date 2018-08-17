const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path')

http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);

const options = {
<<<<<<< HEAD
  key: fs.readFileSync(path.join(__dirname, '/jayani_com.key')),
  cert: fs.readFileSync(path.join(__dirname, '/jayani_com.csr')),
=======
  ca: fs.readFileSync(path.join(__dirname, '/keys/jayanimusic_com.ca-bundle')),
  key: fs.readFileSync(path.join(__dirname, '/keys/jayanimusic_com.key')),
  cert: fs.readFileSync(path.join(__dirname, '/keys/jayanimusic_com.crt')),
>>>>>>> 1e0f945... https
  requestCert: false,
  rejectUnauthorized: false
};

const app = express();
app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
  console.log("Got Request")
>>>>>>> 1e0f945... https
=======
>>>>>>> 0bc118d... redirect to https
  res.sendFile(path.join(__dirname, '/build/index.html'));
})

const server = https.createServer(options, app);
server.listen(443);
server.on('listening', () => {
  console.log('Server is listening on port: 443');
});
