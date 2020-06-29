const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const http = require('http');
const https = require('https');
const fs = require('fs');
require('dotenv').config();


const pageRouter = require('./routes/page');
const boardRouter = require('./routes/board');
const authRouter = require('./routes/auth');
// const imageRouter = require('./routes/board');

const { sequelize } = require('./models');
const passportConfig = require('./passport'); // = ./passport = ./passport/index.js

const app = express();
sequelize.sync();
passportConfig(passport);

const hostname = "webminor.kro.kr";

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'fronts')));

app.use('/img', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/board', boardRouter);
app.use('/auth', authRouter);


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
    // console.log(process.cwd());
});