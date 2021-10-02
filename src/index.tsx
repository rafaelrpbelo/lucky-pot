import React from 'react';
import ReactDOM from 'react-dom';
import { startFakeApi } from './services/fakeApi';
import { App } from './App';

startFakeApi();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
