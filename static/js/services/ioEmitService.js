
const dataHolderElem = document.querySelector('.data_holder--js');

socket.emit('start', {
    data: 'start'
});

socket.on('newData', (data) => {
    const paragraph = document.createElement('p');
    console.log(data);
    paragraph.innerText = `${Date()}`;
    dataHolderElem.appendChild(paragraph);
});