// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');

// App Setup

// below two lines are middlewares
app.use(morgan('combined'));    // morgan is a logging tool that outputs any server requests
app.use(bodyParser.json( { type: '*/*'}));  //parses all incoming requests into json
router(app);
// Server Setup
const port = process.env.PORT || 3000
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on: ', port);
