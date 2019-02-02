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
        let columnNum = parseInt(column);
        this.board.some((row,index)=>{
            if(parseInt(row[columnNum]) === 0){
                this.board[index][columnNum] = 1;
                return true;
            }
        });
    }

   
};