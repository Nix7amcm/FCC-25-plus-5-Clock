import React from 'react';
import '../styles/Controls.css';


const Controls = ( { onStartStop, onReset } ) => {
  return (
    <div className='controls'>

      <button id='start_stop' onClick={onStartStop}>
        <i className="fa fa-play"></i>
        <i className="fa fa-pause"></i>
      </button>
      
      <button id='reset' onClick={onReset}>
        <i className="fa fa-refresh"></i>
      </button>
    
    </div>
  );
};


export default Controls;