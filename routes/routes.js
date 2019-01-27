const routes = {
    def: (app) => {
        return app.get('/', (req, res) => {
            res.writeHead(302, {
                'Location': '/game'
            });
            res.end();

        })
    },
    game: (app) => {
        return app.get('/game', (req, res) => {
            let options = {
                root: './static/',
                dotfiles: 'deny',
                headers: {
                    'x-timestamp': Date.now(),
                    'x-sent': true,
                    'requestTime': req.reqTime,
                }
              };
          
            res.sendFile('./game.html', options);
        })
    }
};

module.exports = (app)=> {
    routes.def(app);
    routes.game(app);
}