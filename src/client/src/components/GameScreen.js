import React, { useEffect, useState } from 'react';
import GameBoard from './GameBoard';


const initialBoard = [['', '', ''],['', '', ''],['', '', '']];
export default function GameScreen({socket}) {
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isPlayerTurn, setIsPlayerTurn] = useState(null);
    const [playerSymbol, setPlayerSymbol] = useState(null);
    const [score, setScore] = useState(null);
    const [winner, setWinner] = useState(null);

    const [board, setBoard] = useState(initialBoard);

    const placePiece = (row, col) => {
        if(winner)
            return;
        socket.emit('placePiece', {
            row: row,
            col: col
        })
    }

    const checkTurn = (isXTurn, symbol) => {
        return (isXTurn && symbol === 'X') || (!isXTurn && symbol === 'O');
    }

    useEffect(() => {
        if(isDataLoaded)
            return;
        socket.on('initialGameData', ({symbol, score, isXTurn}) => {
            setPlayerSymbol(symbol);
            setScore(score);
            setIsPlayerTurn(checkTurn(isXTurn, symbol));
            setIsDataLoaded(true);
        });
        socket.on('turnPlayed', ({isXTurn, coordinate, symbol}) => {
            setIsPlayerTurn(checkTurn(isXTurn, playerSymbol));
            setBoard(prevBoard => {
                const newBoard = [...prevBoard];
                newBoard[coordinate.row][coordinate.col] = symbol;
                return newBoard;
            });

        });

        socket.on('gameOver', ({winner, score}) => {
            setScore(score);
            setWinner(winner);
        })

    }, [isDataLoaded, socket, playerSymbol]);

    if(!isDataLoaded)
        return (
            <div>Loading game...</div>
        );
    const statusMessage = () => {
        if(!winner) {
            if(isPlayerTurn)
                return 'Your turn!';
            else
                return 'Waiting for oponent move...';
        }
        else {
            if(winner !== 'tie')
                return `${winner} wins!`;
            return 'You tied!'
        }
    }

    return (
        <div>
            <p>{`You are playing as ${playerSymbol}`}</p>
            <p>{statusMessage()}</p>
            <p>{`X won ${score.xWon} times, O won ${score.oWon} times`}</p>
            <GameBoard board={board} placePiece={placePiece}/>
        </div>
    )
}
