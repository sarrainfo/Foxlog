// Import
import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import PropTypes from 'prop-types';
// import Table from 'react-bootstrap/Table';

import { URL, ALERT_EVENT } from '../constants';

//= =======================================
// Component

function Alert({ socket }) {
  const [reponse, setReponse] = useState([]);

  useEffect(() => {
    // const socket = socketIOClient(`${URL}:4000`);
    socket.on(ALERT_EVENT, (data) => { console.log('alert', data); setReponse(data); });
    return () => socketIOClient.disconnect();
  }, []);
  return (
    <div>
      High traffics generated an alert- hits=
      {' '}
      {reponse.value}
      ,
      {' '}
      triggered at:
      {' '}
      {reponse.date}
    </div>

  );
}

Alert.protoTypes = {
  socket: PropTypes.func.isRequired,

};

export default Alert;
