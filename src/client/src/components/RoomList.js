import React from 'react'

export default function RoomList({availableRooms, onRefresh}) {
    const renderRooms = () => {
    return availableRooms.map(room => <p>{room.roomName}</p>)
    }
    return (
        <div>
            <p>Rooms:</p>
            <button onClick={onRefresh}>Refresh list</button>
            {renderRooms()}
        </div>
    )
}
