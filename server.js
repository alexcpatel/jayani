const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path')

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

const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

const app = express();
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
app.use(express.static(path.join(__dirname, '/build')));

app.get('*', (req, res) => {
<<<<<<< HEAD
=======
  console.log("Got Request")
>>>>>>> 1e0f945... https
  res.sendFile(path.join(__dirname, '/build/index.html'));
})

const server = https.createServer(options, app);
server.listen(443);
server.on('listening', () => {
  console.log('Server is listening on port: 443');
});