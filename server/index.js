'use strict';

/* eslint-disable max-params */

const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const { parse } = require('url');

const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportGithub = require('passport-github');
const expressSession = require('express-session');

const setupApiRoutes = require('./routes/api');
const setupPagesRoutes = require('./routes/pages');

const strategy = new passportGithub.Strategy(
    {
        cclientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        // Адрес, на который пользователь будет возвращён после авторизации в GitHub
        callbackURL: 'http://localhost:3000/'
    },
    (accessToken, refreshToken, profile, done) => {
        // В этом месте можно сохранить пользователя в свою базу
        // или найти уже существующего в базе по данным из `profile`
        //
        // User.findOrCreate(profile.username, (err, profile) => {
        //     done(err, profile);
        // });

        // Чтобы завершить процесс аутентификации необходимо вызвать `done`
        // и передать туда профиль пользователя – исходный или дополненный из базы
        done(null, profile)

        // Чтобы отменить аутентификацию отправляем false
        // done(null, false)
    }
);

passport.use(strategy);

const app = next({ dev: process.env.NODE_ENV !== 'production' });

const server = express();

server.use(cookieParser);

server.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

passport.serializeUser((profile, done) => {
    done(null, profile);
});

passport.deserializeUser((profile, done) => {
    done(null, profile);
});

server.use(passport.initialize());

server.use(passport.session());

app.prepare().then(() => {
    server.use(bodyParser.json());

    setupPagesRoutes(server, app);
    setupApiRoutes(server, app);

    server.listen(3000, () => console.log('Listening on http://localhost:3000'));
});

