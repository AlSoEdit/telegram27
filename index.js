/* eslint-disable no-console */

const app = require('./app');
const http = require('http');
const config = require('config');

const port = config.port;

app.set('port', port);
const server = http.createServer(app);

server.listen(port);
server.on('error', err => console.error(err));
server.on('listening', () => console.info(`Server started on ${port}`));
