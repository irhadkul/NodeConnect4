
const socket = io.connect();


document.querySelector('.send-data').addEventListener('click', (event) => {
    socket.emit('getData', {
        data: 'some new data'
    });

});