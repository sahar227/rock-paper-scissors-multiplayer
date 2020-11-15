import React from 'react'

export default function GameBoardCell({value, row, column}) {
    return (
        <span style={{border: "1px solid black", display:"flex", justifyContent:"center", alignItems:"center"}}>
            {value}
        </span>
    )
}
