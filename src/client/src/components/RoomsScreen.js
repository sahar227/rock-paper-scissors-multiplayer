import React, { useEffect, useState, useCallback } from "react";
import CreateRoom from "./CreateRoom";
import RoomList from './RoomList';

export default function RoomsScreen({socket, setGameScreen, setWaitScreen}) {
    const [availableRooms, setAvailableRooms] = useState([])

    const createRoom = (roomName, password) => {
        socket.emit('createRoom', {roomName, password});
    }

    const joinRoom = (roomId) => (password) => {
        socket.emit('joinRoom', {roomId: roomId, password});
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
            setAvailableRooms(rooms);
          });
          socket.on('roomCreated', () => setWaitScreen());
          socket.on('gameStarted', () => setGameScreen());
          getRooms(socket);
    }, [socket, getRooms, setGameScreen, setWaitScreen]);
    
    return (
        <div>
            <CreateRoom onCreateRoom={createRoom}/>
            <RoomList availableRooms={availableRooms} onRefresh={() => getRooms(socket)} joinRoom={joinRoom} />
        </div>
        );
}
  