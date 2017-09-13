/* eslint-disable no-console */

const app = require('./app');
const http = require('http');
const config = require('config');

const sessionParser = config.get('sessionParser');

const port = process.env.PORT || config.get('port');

app.set('port', port);
const server = http.createServer(app);

server.listen(port);
server.on('error', err => console.error(err));
server.on('listening', () => console.info(`Server started on ${port}`));

const WebSocket = require('ws');

const wsServer = new WebSocket.Server({ server });
const { wsAddMessage } = require('./controllers/dialog');

wsServer.on('connection', (sock, req) => {
    sessionParser(req, {}, () => wsAddMessage(sock, req, wsServer.clients));
});
