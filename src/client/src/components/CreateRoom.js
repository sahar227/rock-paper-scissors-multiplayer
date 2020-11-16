import React, { useState } from 'react'

export default function CreateRoom({onCreateRoom}) {
    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div style={{padding:"1rem", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"flex-start"}}>
            <h2>Create room and wait for another player to join</h2>
            <div>
                <label htmlFor="name" style={{display:"block"}}>Room name: </label>
                <input id="name" type="text" value={roomName} onChange={e => setRoomName(e.target.value)} placeholder="Your room name" style={{display:"block"}}/>
            </div>
            <div>
                <label htmlFor="password" style={{display:"block"}}>Room password: </label>
                <input id="password" type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Leave empty for no password" style={{display:"block"}}/>
            </div>


            <button style={{marginTop:"0.5rem"}} onClick={() => onCreateRoom(roomName, password)}>Create Room!</button>
        </div>
    )
}
