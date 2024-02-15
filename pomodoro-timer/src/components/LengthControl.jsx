import React from 'react';
import '../styles/LengthControl.css';

// ***** Renders the Break/Session length controls *****

//>>> Pass in the props:
const LengthControl = ( {
  title,
  count,
  decrementId,
  incrementId,
  lengthId,
  labelId,
  onClickHandler,
  isDisabled
} ) => {
  return (
    <div className="length-control">
      
      <div id={labelId} className='break-session-title' >{title}</div>
      
      <div className='length-btns-count-wrap'>
        <button id={decrementId} onClick={() => onClickHandler( false )} disabled={isDisabled}>
          -
        </button>
        
        <div id={lengthId}>{count}</div>
        
        <button id={incrementId} onClick={() => onClickHandler( true )} disabled={isDisabled}>
          +
        </button>
      </div>

      <div className='mins'>mins</div>
    
    </div>
  );
};


export default LengthControl;