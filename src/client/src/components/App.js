import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import {URL} from '../configs';

import RoomsScreen from './RoomsScreen';
import GameScreen from './GameScreen';
import WaitScreen from './WaitScreen';
import Header from "./Header";


function App() {
  const [socket, setSocket] = useState(null);
  const [screen, setScreen] = useState('rooms');
  const [error, setError] = useState(null);

  const setGameScreen = () => {
    setError(null);
    setScreen('game');
  };
  const setWaitScreen = () => {
    setError(null);
    setScreen('wait');
  };

  useEffect(() => {
    const socket = socketIOClient(URL);
    socket.on('error', (error) => {
      setError(error);
    })
    setSocket(socket);
  },[]);

  return (
    <div>
      <Header/>
      {screen === 'rooms' && <RoomsScreen socket={socket} setGameScreen={setGameScreen} setWaitScreen={setWaitScreen}/>}
      {screen === 'wait' && <WaitScreen/>}
      {screen === 'game' && <GameScreen socket={socket}/>}
      {error && <p style={{color:"red"}}>{`Error: ${error}`}</p>}
    </div>
  );
}

export default App;
