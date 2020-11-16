import React from 'react'
import RoomListItem from './RoomListItem'

export default function RoomList({availableRooms, onRefresh, joinRoom, roomPrefix, setRoomPrefix}) {
    const renderRoomItems = () => {
        return availableRooms.map((room) => <RoomListItem key={room.roomId} roomData={room} joinRoom={joinRoom(room.roomId)}/>)
    }
    return (
        <div>
            <h2>Join an existing room:</h2>
            <input type="text" value={roomPrefix} onChange={e => setRoomPrefix(e.target.value)} placeholder="Filter by room name"/>
            <button onClick={onRefresh}>Refresh list</button>
            {renderRoomItems()}
        </div>
    )
}
