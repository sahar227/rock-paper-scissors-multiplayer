import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import {URL} from '../configs';

import RoomsScreen from './RoomsScreen';
import GameScreen from './GameScreen';


function App() {
  const [socket, setSocket] = useState(null);
  const [screen, setScreen] = useState('rooms');

  const setGameScreen = () => {
    setScreen('game');
  };

  useEffect(() => {
    const socket = socketIOClient(URL);
    setSocket(socket);
  },[]);

  return (
    <div>
      <h1>Tic Tac Toe!</h1>
      {screen === 'rooms' && <RoomsScreen socket={socket} setGameScreen={setGameScreen}/>}
      {screen === 'game' && <GameScreen />}
    </div>
  );
}

export default App;
