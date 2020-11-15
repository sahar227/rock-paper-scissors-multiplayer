class TicTacToeSession {
    constructor(participants) {
        this.board = createNewBoard();
        this.score = {
            xWon: 0,
            oWon: 0
        };
        this.players = participants.map((socket, index) => {
            return {
                socket,
                symbol: index % 2 == 0 ? 'X' : 'O'
            }
        });
        this.isXturn = true;
        for(const player of this.players) {
            this.notifyStartGame(player);
            this.registerForNotificationsFromPlayers(player);
        }
    }

    notifyStartGame(player) {
        player.socket.emit('gameStarted');
        player.socket.emit('initialGameData', {
            symbol: player.symbol,
            isXTurn: this.isXturn,
            score: this.score
        });
    }

    registerForNotificationsFromPlayers(player) {
        player.socket.on('placePiece', ({row, col}) => {
            if(this.isPlayerTurn(player))
                this.placePiece(row, col, player.symbol);
        });
    }

    isPlayerTurn(player) {
        return (player.symbol === 'X' && this.isXturn || player.symbol === 'O' && !this.isXturn);
    }

    placePiece(row, col, symbol) {
        // coordinate is on the board and nothing is placed there
        if(!isCoordinateValid(this.board, row, col) || this.board[row][col])
            return;
        this.board[row][col] = symbol;
        this.isXturn = !this.isXturn;
        const winner = checkWinner(this.board);
        if(winner === 'X') {
            this.score.xWon++;
        }
        else if(winner === 'O') {
            this.score.oWon++;
        }
        
        // Notify all players that new piece was placed
        for(const player of this.players) {
            player.socket.emit('turnPlayed', {
                isXTurn: this.isXturn,
                coordinate: {
                    row: row,
                    col: col
                },
                symbol: symbol
            });
            if(winner) {
                player.socket.emit('gameOver', {
                    winner: winner,
                    score: this.score
                });
            }

        }
    }
}


const createNewBoard = () => {
    const size = 3;
    const board = new Array(size);
    for(let i = 0; i < size; i++)
        board[i] = new Array(size);
    return board;
}

const isCoordinateValid = (board, row, col) => {
    if(row < 0 || col < 0)
        return false;
    if(!board || row >= board.length || !board[0] || col >= board[0].length)
        return false;
    return true;
}


const checkWinner = (board) => {
    let winner = checkRows(board)
    if(winner)
        return winner;
    winner = checkCols(board)
    if(winner)
        return winner;
    winner = checkDiagonals(board);
    if(winner)
        return winner;
    winner = checkTie(board);
    if(winner)
        return winner;
    return null;
}

const checkRows = (board) => {
    for(let row = 0; row < board.length; row++) {
        const element = board[row][0];
        if(!element)
            return null;
        let winCheck = true;
        for(let col = 1; col < board[row].length; col++)
            if(board[row][col] !== element) {
                winCheck = false;
                break;
            }
        if(winCheck)
            return element;
        return null;
    }
}

const checkCols = (board) => {
    for(let col = 0; col < board[0].length; col++) {
        const element = board[0][col];
        if(!element)
            return null;
        let winCheck = true;
        for(let row = 1; row < board.length; row++)
            if(board[row][col] !== element) {
                winCheck = false;
                break;
            }
        if(winCheck)
            return element;
        return null;
    }
}

const checkDiagonals = (board) => {
    const size = board.length;
    // left to right diagonal
    let element = board[0][0];
    let winCheck = true;
    if(element) {
        for(let i = 1; i < size; i++) {
            if(board[i][i] !== element) {
                winCheck = false;
                break;
            }
        }
        if(winCheck)
            return element;
    }


    // right to left diagonal
    element = board[0][size - 1];
    if(element) {
        winCheck = true;
        for(let i = 1; i < size; i++) {
            if(board[i][size - i - 1] !== element) {
                winCheck = false;
                break;
            }
        }
        if(winCheck)
            return element;
    }

    return null;
}

const checkTie = (board) => {
    for(let i = 0; i < board.length; i++)
        for(let j = 0; j < board[0].length; j++) {
            if(!board[i][j])
                return null;
        }
    return 'tie';
}

module.exports = TicTacToeSession;