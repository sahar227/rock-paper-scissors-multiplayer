import React, { useState } from 'react'

export default function RoomListItem({roomData, joinRoom}) {
    const [password, setPassword] = useState('');
    const passwordPlaceHolder = roomData.isPasswordProtected ? "Enter room password" : "No password required";
    return (
        <li style={{display:"flex"}}>
            <p>{roomData.roomName}</p>
            <input type="text" value={password} onChange={e => setPassword(e.target.value)} disabled={!roomData.isPasswordProtected} placeholder={passwordPlaceHolder}/>
            <button onClick={() => joinRoom(password)}>Join</button>
        </li>
    );
}
