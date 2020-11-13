import React, { useEffect, useState, useCallback } from "react";
import RoomList from './RoomList';

export default function RoomsScreen({socket, setGameScreen}) {
    const [availableRooms, setAvailableRooms] = useState([])

    const createRoom = () => {
        socket.emit('createRoom', {roomName: 'my room'});
        getRooms(socket);
    }
    const getRooms = useCallback(() => {
    if(!socket)
        return;
    socket.emit('getAvailableRooms');
    }, [socket]);

    useEffect(() => {
        if(!socket)
            return;
        socket.on('availableRooms', (rooms) => {
            console.log('available rooms:', rooms);
            setAvailableRooms(rooms);
          });
          socket.on('roomCreated', () => setGameScreen('game'));
          getRooms(socket);
    }, [socket, getRooms, setGameScreen]);
    
    return (
        <div>
            <button onClick={createRoom}>Create Room!</button>
            <RoomList availableRooms={availableRooms} onRefresh={() => getRooms(socket)} />
        </div>
        );
}
  