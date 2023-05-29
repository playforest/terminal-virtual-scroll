import React from 'react';

function App() {
  return (
    <div className="mac-window">
      <div className="title-bar">
        <div className="buttons">
          <div className="button close"></div>
          <div className="button min"></div>
          <div className="button max"></div>
        </div>
        Terminal - /dev/ttyUSB0
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
