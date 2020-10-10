import React from 'react';
import socketIOClient from 'socket.io-client';
import Statistics from './components/Statistics';
import Alert from './components/Alert';

import { URL } from './constants';

function App() {
  const socket = socketIOClient(`${URL}:4000`);
  return (
    <div>
      <Statistics socket={socket} />
      <Alert socket={socket} />
    </div>
  );
}

export default App;
