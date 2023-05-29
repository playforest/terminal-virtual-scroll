import React from 'react';
import { Terminal } from './Terminal';
import './App.css';

function App() {
  return (
    <div className="mac-window">
      <div className="title-bar">
        <div className="buttons">
          <div className="button close"></div>
          <div className="button min"></div>
          <div className="button max"></div>
        </div>
        admin@ubuntu: /dev/tty*
      </div>
      <Terminal />
    </div>
  );
}

export default App;
