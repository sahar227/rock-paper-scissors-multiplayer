import React, { useEffect, useState, useCallback } from "react";
import CreateRoom from "./CreateRoom";
import RoomList from './RoomList';

export default function RoomsScreen({socket, setGameScreen, setWaitScreen}) {
    const [availableRooms, setAvailableRooms] = useState([])
    const [roomPrefix, setRoomPrefix] = useState('');

    const createRoom = (roomName, password) => {
        socket.emit('createRoom', {roomName, password});
    }

    const joinRoom = (roomId) => (password) => {
        socket.emit('joinRoom', {roomId: roomId, password});
    }
    const getRooms = useCallback((roomPrefix) => {
    if(!socket)
        return;
    socket.emit('getAvailableRooms', roomPrefix);
    }, [socket]);

    useEffect(() => {
        if(!socket)
            return;
        socket.on('availableRooms', (rooms) => {
            setAvailableRooms(rooms);
          });
          socket.on('roomCreated', () => setWaitScreen());
          socket.on('gameStarted', () => setGameScreen());
          getRooms(roomPrefix);
    }, [socket, getRooms, setGameScreen, setWaitScreen]);
    
    return (
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
            <CreateRoom onCreateRoom={createRoom}/>
            <RoomList availableRooms={availableRooms} onRefresh={() => getRooms(roomPrefix)} joinRoom={joinRoom} roomPrefix={roomPrefix} setRoomPrefix={setRoomPrefix} />
        </div>
        );
}
  