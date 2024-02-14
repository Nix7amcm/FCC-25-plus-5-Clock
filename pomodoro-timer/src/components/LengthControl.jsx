import React from 'react';
import '../styles/LengthControl.css';


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
      
      <div id={labelId}>{title}</div>
      <button id={decrementId} onClick={() => onClickHandler( false )} disabled={isDisabled}>
        -
      </button>
      
      <div id={lengthId}>{count}</div>
      <button id={incrementId} onClick={() => onClickHandler( true )} disabled={isDisabled}>
        +
      </button>
    
    </div>
  );
};


export default LengthControl;