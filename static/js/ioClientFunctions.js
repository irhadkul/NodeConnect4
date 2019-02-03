
const socket = io.connect();
const board_cellControll = document.querySelectorAll('.board_cell--controllBox');

document.querySelector('.send-data').addEventListener('click', (event) => {
    socket.emit('getData', {
        data: 'some new data'
    });

});
board_cellControll.forEach((elem,key)=>{
    
    elem.addEventListener("click", (event)=>{
        socket.emit('clickedBoardControll', 
            {column: key}
        );
    } );
});