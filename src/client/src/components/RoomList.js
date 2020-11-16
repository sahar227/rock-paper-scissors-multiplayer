import React from 'react'
import RoomListItem from './RoomListItem'

export default function RoomList({availableRooms, onRefresh, joinRoom}) {
    const renderRoomItems = () => {
    // TODO: change key to a room id
    return availableRooms.map((room) => <RoomListItem key={room.roomId} roomData={room} joinRoom={joinRoom(room.roomId)}/>)
    }
    return (
        <div>
            <h2>Join an existing room:</h2>
            <button onClick={onRefresh}>Refresh list</button>
            {renderRoomItems()}
        </div>
    )
}
