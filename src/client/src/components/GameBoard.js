import React, { useState } from 'react'
import GameBoardCell from './GameBoardCell';


const initialBoard = [['', '', ''],['', '', ''],['', '', '']];
export default function GameBoard() {
    const [board, setBoard] = useState(initialBoard);

    const renderBoard = () => {
        return board.map((row) => {
            return row.map((cell) => <GameBoardCell value={cell}/>) 
        });
    };
    return (
        <div style={{display:"grid", gridTemplateRows: "5rem 5rem 5rem", gridTemplateColumns: "5rem 5rem 5rem"}}>
            {renderBoard()}
        </div>
    )
}
