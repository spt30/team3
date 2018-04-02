'use strict';

/* eslint-disable capitalized-comments */

require('dotenv').config();

const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');

const routesPages = require('./routes/pages');
const routesApi = require('./routes/api');
const routesAuth = require('./routes/auth');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const server = express();

app.prepare().then(() => {
    routesAuth(server);
    routesPages(server, app);
    routesApi(server);

    server.use(bodyParser.json())
        .listen(3000, () => console.log('Listening on http://localhost:3000'));
});
