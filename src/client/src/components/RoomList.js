import React from 'react'
import RoomListItem from './RoomListItem'

export default function RoomList({availableRooms, onRefresh, joinRoom}) {
    const renderRoomItems = () => {
    return availableRooms.map(room => <RoomListItem roomData={room} joinRoom={joinRoom(room.roomName)}/>)
    }
    return (
        <div>
            <h2>Join an existing room:</h2>
            <button onClick={onRefresh}>Refresh list</button>
            {renderRoomItems()}
        </div>
    )
}
