const routes = {
    def: (app) => {
        return app.get('/', (req, res) => {
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

        });
    },
 
};

module.exports = (app)=> {
    routes.def(app);
  
}