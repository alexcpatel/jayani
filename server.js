const http = require('http');
const express = require('express');

// Express app setup
const app = express();

app.use( express.static( `${__dirname}/build` ) );

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '/build/index.html'));
})

const server = http.createServer(app);
server.listen(3000);
server.on('listening', () => {
  console.log('Server is listening on port: 3000');
});