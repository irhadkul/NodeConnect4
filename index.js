// jshint esversion:6
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
    // socket.in('test').adapter.rooms['test'].length
    let roomName = 'test';
    let roomGame = null;
    let player = 1;
    socket.join(roomName);
   
    if(socket.adapter.rooms[roomName].length > 1){
        if(socket.adapter.rooms[roomName].length > 2){
            return;
        }
        player = 2;
        roomGame = socket.adapter.rooms[roomName].game ;
        console.log("################",socket.adapter.rooms[roomName])
        ioFunctions(socket,roomGame , roomName, player);
    } else{
        roomGame = new Game();
        socket.adapter.rooms[roomName].game = roomGame;
        ioFunctions(socket,roomGame , roomName, player);
    }
   
    
    
});



