import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import {URL} from '../configs';

function App() {
  const [socket, setSocket] = useState(null);
  const [availableRooms, setAvailableRooms] = useState([])

  useEffect(() => {
    const socket = socketIOClient(URL);
    socket.on('availableRooms', (rooms) => {
      console.log('available rooms:', rooms);
      setAvailableRooms(rooms);
    });
    socket.on('roomCreated', () => console.log('room created!'));

    setSocket(socket);
  },[]);

  const getRooms = () => {
    socket.emit('getAvailableRooms');
  }

  const createRoom = () => {
    socket.emit('createRoom', {roomName: 'my room'});
  }
  return (
    <div>
      Tic Tac Toe!
      <button onClick={getRooms}>Get rooms!</button>
      <button onClick={createRoom}>Create Room!</button>
    </div>
  );
}

export default App;
