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
  key: fs.readFileSync(path.join(__dirname, '/jayani_com.key')),
  cert: fs.readFileSync(path.join(__dirname, '/jayani_com.csr')),
  requestCert: false,
  rejectUnauthorized: false
};

const app = express();
app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
  console.log("Got Request")
  res.sendFile(path.join(__dirname, '/build/index.html'));
})

const server = https.createServer(options, app);
server.listen(443);
server.on('listening', () => {
  console.log('Server is listening on port: 443');
});
