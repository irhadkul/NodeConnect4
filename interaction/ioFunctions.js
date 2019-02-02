module.exports = (socket) => {
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
        console.log(data);
        socket.emit('clickedBoardControll', {data: data});
    })

}