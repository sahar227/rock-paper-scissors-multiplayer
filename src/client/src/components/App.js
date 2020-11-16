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

  const setGameScreen = () => {
    setScreen('game');
  };
  const setWaitScreen = () => {
    setScreen('wait');
  };

  useEffect(() => {
    const socket = socketIOClient(URL);
    setSocket(socket);
  },[]);

  return (
    <div>
      <Header/>
      {screen === 'rooms' && <RoomsScreen socket={socket} setGameScreen={setGameScreen} setWaitScreen={setWaitScreen}/>}
      {screen === 'wait' && <WaitScreen/>}
      {screen === 'game' && <GameScreen socket={socket}/>}
    </div>
  );
}

export default App;
