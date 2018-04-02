module.exports = (server, app) => {
    server
        .get('/main', (req, res) => {
            app.render(req, res, '/index');
        });
};
