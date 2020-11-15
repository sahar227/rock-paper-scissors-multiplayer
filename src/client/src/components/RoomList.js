import React from 'react'
import RoomListItem from './RoomListItem'

export default function RoomList({availableRooms, onRefresh, joinRoom}) {
    const renderRoomItems = () => {
    // TODO: change key to a room id
    return availableRooms.map((room, i) => <RoomListItem key={i} roomData={room} joinRoom={joinRoom(room.roomName)}/>)
    }
    return (
        <div>
            <h2>Join an existing room:</h2>
            <button onClick={onRefresh}>Refresh list</button>
            {renderRoomItems()}
        </div>
    )
}
