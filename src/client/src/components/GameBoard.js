import React, { useState } from 'react'
import GameBoardCell from './GameBoardCell';


export default function GameBoard({board, placePiece}) {

    const renderBoard = () => {
        return board.map((row, i) => {
            return row.map((cell, j) => <GameBoardCell placePiece={() => placePiece(i, j)} value={cell}/>) 
        });
    };
    return (
        <div style={{display:"grid", gridTemplateRows: "5rem 5rem 5rem", gridTemplateColumns: "5rem 5rem 5rem"}}>
            {renderBoard()}
        </div>
    )
}
