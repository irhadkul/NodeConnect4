// jshint esversion:6
module.exports = (socket, game, roomName , player) => {
    socket.on('start', (data) => {
        console.log(data);
    });

    socket.on('join room', (data) => {
        console.log(data);
    });
    socket.on('leave room', (data) => {
        console.log(data);
    });


    socket.on('getData', (data) => {
        console.log(data);
        socket.emit('newData', {data: 'New Data'});
    });

    socket.on('clickedBoardControll', (data) => {
        let gameStatus = game.gameStatus().status;
        console.log('player',player);
        if(gameStatus !== 'ended'){
            console.log('player',player);
            game.calculateImpact(data.column, player);
            // get the new status
            gameStatus = game.gameStatus().status;
            socket.to(roomName).emit('updatedBoardControll', {column: data.column, game: game.board, status: gameStatus});
        } else{
            socket.to(roomName).emit('updatedBoardControll', {status: gameStatus});
        }
    });

};