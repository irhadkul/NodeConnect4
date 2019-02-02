const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = Number(process.env.PORT || 3000);
const io = require('socket.io').listen(server);
const routes = require('./routes/routes');
const ioFunctions = require('./interaction/ioFunctions');
const Game = require('./logic/game/game');
// Request Time
let reqTime = (req,res,next)=>{
    let date = new Date();
    req.reqTime = `${date.toISOString()}`;
    next();
};  
// App Config
app.use(reqTime);
app.use("/static", express.static(__dirname + '/static'));


server.listen(port);
// Routing
routes(app);
// IO functions
io.on('connection', (socket)=>{
    let roomGame = new Game();
    ioFunctions(socket, roomGame);
});



