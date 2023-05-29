import React from 'react';
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
      <div className="content">
        <div className="prompt">
          /dev/ttyUSB0$
        </div>
      </div>
    </div>
  );
}

export default App;
