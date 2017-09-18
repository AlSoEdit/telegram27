
const { wsDialog } = require('./dialog');

module.exports = (sock, req, clients) => {
    const user = req.session.passport && req.session.passport.user;
    if (!user) {
        return sock.close();
    }

    sock.user = user;

    sock.on('message', async message => {
        const action = JSON.parse(message);
        console.info(action);

        wsDialog(action, sock, [...clients]);
    });
};