module.exports = (socket) => {
    socket.on('start', (data) => {
        console.log(data);
    });

    socket.on('getData', (data) => {
        console.log(data);
        socket.emit('newData', {data: 'New Data'});
    })

}