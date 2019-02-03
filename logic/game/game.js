// jshint esversion:6
module.exports = class Game {
    constructor() {
        this.board = this.createBoard();
        this.disabledInteraction = false;
    }
    createBoard() {
        // board is bottom up
        let boardTemplate = [
            [{player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}],
            [{player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}],
            [{player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}],
            [{player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}],
            [{player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}],
            [{player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}, {player: 0}]
        ];

        return boardTemplate;
    }
    calculateImpact(column, playerNum = 1) {
        let columnIndex = parseInt(column);
        if(this.disabledInteraction){
            return;
        }
        if(columnIndex > this.board[0].length - 1 ){
            return;
        }
        this.board.some((row, rowIndex) => {
            let columnPlace = this.board[rowIndex][columnIndex];
            let impact = parseInt(columnPlace.player);
            if ( impact === 0) {
                try {
                    this.board[rowIndex][columnIndex].player = playerNum;
                    this.checkNeighbours( row, rowIndex, columnIndex , playerNum);

                } catch (e) {
                    console.warn(e);
                }
                return true;
            }
        });
        return true;
    }

    checkNeighbours(row , rowIndex ,columnIndex, playerNum){

        try{
            // Calculate possible movement
            let possibleMovement = this._possibleMovement(row , rowIndex ,columnIndex);

            if(possibleMovement.vertical.up){
                // check vertical
                this._checkVerticalCell( rowIndex ,columnIndex, playerNum);
            }

            if(possibleMovement.diagonal.leftUp || possibleMovement.diagonal.rightUp){
                // check vertical
                this._checkDiagonalCells( rowIndex ,columnIndex, playerNum, possibleMovement);
            }


             // check horizontal
            this._checkHorizontalCells( rowIndex ,columnIndex, playerNum);
          
            

        }catch(e){
            console.log("Out of bounds",e);
        }
     
    }

    _possibleMovement(row, rowIndex, columnIndex) {
        // Board is upside down, rememmber
        let movement = {
            vertical: {
                up: false
            },
            diagonal: {
                leftUp: false,
                rightUp: false
            }
        };

        if (rowIndex !== 0) {
            movement.vertical.up = true;
            if (columnIndex < row.length - 1) {
                movement.diagonal.rightUp = true;
            }
            if (columnIndex > 0) {
                movement.diagonal.leftUp = true;
            }
        }

        return movement;
    }

    _checkVerticalCell(rowIndex ,columnIndex, playerNum){
        let verticalCell = this.board[rowIndex-1][columnIndex];
        let currentCell = this.board[rowIndex][columnIndex];

        if( verticalCell.player === playerNum){
            if(!verticalCell.vertical){
                verticalCell.vertical = 0;
                currentCell.vertical = 1;
            }  

            verticalCell.vertical += 1;
            currentCell.vertical = verticalCell.vertical;

            if(verticalCell.vertical === 3){
                currentCell.vertical = 4;
                this._win(playerNum);
            }
        }
    }

    _checkHorizontalCells(rowIndex ,columnIndex, playerNum){
        let currentRow = this.board[rowIndex];
        let horizontalHitAcc = 0;

        currentRow.some((rowCell,index)=>{
            if(horizontalHitAcc >= 4){
                return true;
            }
            if(rowCell.player == playerNum){
                horizontalHitAcc+=1;
            }
            else{
                horizontalHitAcc = 0;
            }
        });

        if(horizontalHitAcc >= 4){
            this._win(playerNum);
            return true;
        }

    }



    _checkDiagonalCells(rowIndex ,columnIndex, playerNum, possibleMovement){
        let currentCell = this.board[rowIndex][columnIndex];

        if(possibleMovement.diagonal.rightUp){
            let diagonalCellRight = this.board[rowIndex-1][columnIndex + 1];
            this._checkHorizontalRight(diagonalCellRight,playerNum,currentCell);
        }
        if(possibleMovement.diagonal.leftUp){
            let diagonalCellLeft = this.board[rowIndex-1][columnIndex - 1];
            this._checkDiagonalLeft(diagonalCellLeft,playerNum,currentCell);
        }

    }
    _checkDiagonalRight(diagonalCellRight,playerNum, currentCell){
        if( diagonalCellRight.player === playerNum){
            if(!diagonalCellRight.diagonalRight){
                diagonalCellRight.diagonalRight = 1;   
            }  

            currentCell.diagonalRight = diagonalCellRight.diagonalRight + 1;

            if(currentCell.diagonalRight === 4){
                this._win(playerNum);
            }
        }
    }

    _checkDiagonalLeft(diagonalCellLeft, playerNum, currentCell ){
        if( diagonalCellLeft.player === playerNum){
            if(!diagonalCellLeft.diagonalLeft){
                diagonalCellLeft.diagonalLeft = 1;
            }  
            currentCell.diagonalLeft = diagonalCellLeft.diagonalLeft + 1;

            if(currentCell.diagonalLeft === 4){
      
                this._win(playerNum);
            }
        }
    }

    _win(playerNum){
        console.log("############ you won #################", playerNum);
        this._disableInteraction();
    }
    _disableInteraction(){
        this.disabledInteraction = true;
    }
    _resetBoard(){
        this.board = this.createBoard();
        this.disabledInteraction = false;
    }

    gameStatus(){
        let progress = this.disabledInteraction ? 'ended' : 'inProgress';
        let status = {
            status: progress
        };

        return status;
    }

};