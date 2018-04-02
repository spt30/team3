'use strict';

/* eslint-disable capitalized-comments */

require('dotenv').config();

const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const routesPages = require('./routes/pages');
const routesApi = require('./routes/api');
const routesAuth = require('./routes/auth');
const passport = require('./github-authorization');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const server = express();

app.prepare().then(() => {
    server.use(bodyParser.json());

    server.use(cookieParser());

    server.use(expressSession({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }));

    server.use(passport.initialize());
    server.use(passport.session());

    routesAuth(server);
    routesPages(server, app);
    routesApi(server);

    server.listen(3000, () => console.log('Listening on http://localhost:3000'));
});
