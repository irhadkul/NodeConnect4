// jshint esversion:6
module.exports = (socket, game) => {
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
        if(gameStatus !== 'ended'){
            game.calculateImpact(data.column);
            // get the new status
            gameStatus = game.gameStatus().status;
            socket.emit('updatedBoardControll', {column: data.column, game: game.board, status: gameStatus});
        } else{
            socket.emit('updatedBoardControll', {status: gameStatus});
        }
    });

};