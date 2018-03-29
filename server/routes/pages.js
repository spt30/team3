'use strict';

const passport = require('passport');

module.exports = (server, app) => {
    server
        .get('/', (req, res) => {
            app.render(req, res, '/index');
        })
        .get('/login', passport.authenticate('github'));
};
