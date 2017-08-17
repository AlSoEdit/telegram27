/* eslint-disable no-console */

const app = require('./app');
const https = require('https');
const config = require('config');

const port = config.port;

app.set('port', port);
const server = https.createServer(app);

server.listen(port);
server.on('error', err => console.error(err));
server.on('listening', () => console.info(`Server started on ${port}`));
