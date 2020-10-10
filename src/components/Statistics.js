// Import
import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';

import { URL, STATISTICS_EVENT } from '../constants';

//= =======================================
// Component

function Statistics({ socket }) {
  const [reponse, setReponse] = useState([]);

  useEffect(() => {
    // const socket = socketIOClient(`${URL}:4000`);
    socket.on(STATISTICS_EVENT, (data) => { console.log('stats', data); setReponse(data); });
    return () => socketIOClient.disconnect();
  }, []);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>

          <th>Section</th>
          <th>Number of visite</th>
          <th>Number of errors</th>
        </tr>
      </thead>
      <tbody>
        {reponse.map((data) => (
          <tr key={data.section}>
            <td>{data.section}</td>
            <td>{data.nbVisited}</td>
            <td>{data.nbErrors}</td>
          </tr>
        ))}
      </tbody>
    </Table>

  );
}

Statistics.protoTypes = {
  socket: PropTypes.func.isRequired,

};

export default Statistics;
