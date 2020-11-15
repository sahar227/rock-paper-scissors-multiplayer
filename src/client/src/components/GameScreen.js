import React from 'react';
import GameBoard from './GameBoard';

export default function GameScreen() {
    return (
        <div>
            <p>Your turn!</p>
            <p>Score is: 0</p>
            <GameBoard/>
        </div>
    )
}
