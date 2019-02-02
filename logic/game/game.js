module.exports = class Game{
    constructor(){
        this.board = this.createBoard();  
    }
    createBoard(){
        let boardTemplate = [
            ['0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0'],
            ['0','0','0','0','0','0','0']
        ];
       
        console.log('empty', boardTemplate);
        return boardTemplate;
    }
    calculateImpact(column){
        this.board.forEach((row)=>{
            if(parseInt(row[column]) === 0){
                this.board[row][column] = 1;
                return;
            }
        });
    }

   
};