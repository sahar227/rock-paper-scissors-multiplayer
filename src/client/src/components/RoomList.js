import React from 'react'
import RoomListItem from './RoomListItem'

export default function RoomList({availableRooms, onRefresh, joinRoom, roomPrefix, setRoomPrefix}) {
    const renderRoomItems = () => {
        if(availableRooms.length === 0)
            return <p>No Available rooms, you can create your own room instead...</p>
        return availableRooms.map((room) => <RoomListItem key={room.roomId} roomData={room} joinRoom={joinRoom(room.roomId)}/>)
    }
    return (
        <div style={{padding:"1rem"}}>
            <h2>Join an existing room:</h2>
            <input type="text" value={roomPrefix} onChange={e => setRoomPrefix(e.target.value)} placeholder="Filter by room name"/>
            <button onClick={onRefresh}>Refresh list</button>
            <div style={{marginTop:"0.5rem"}}>
                {renderRoomItems()}
            </div>
        </div>
    )
}
