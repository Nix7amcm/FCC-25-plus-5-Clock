import React from 'react';
import '../styles/TimerDisplay.css';

const TimerDisplay = ( { label, timeLeft } ) => {


  return (
    <div id='timer'>

      <div id='timer-label'>{label}</div>

      <div id='time-left'>{timeLeft}</div>

    </div>
  );
};


export default TimerDisplay;