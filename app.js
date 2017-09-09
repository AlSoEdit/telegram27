const express = require('express');
const expressSession = require('express-session');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('./libs/passport');

const config = require('config');
const user = require('./routes/user');
const dialog = require('./routes/dialog');
const userController = require('./controllers/user');

const app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession(config.sessionConfig));
app.use(passport.initialize());
app.use(passport.session());


app.use(userController.setAuthState);
app.use('/', user);
app.use('/', dialog);

app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    const { message } = err;

    // set locals, only providing error in development
    res.locals.message = message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.locals.answer.text = message;

    res
        .status(err.status || 500)
        .json(res.locals.answer);
});

module.exports = app;
