import React, { useState, useEffect, useRef } from 'react';
import TimerDisplay from './components/TimerDisplay';
import LengthControl from './components/LengthControl';
import Controls from './components/Controls';
import './styles/App.css';


function App () {

  const [ breakLength, setBreakLength ] = useState( 5 );
  const [ sessionLength, setSessionLength ] = useState( 25 );
  const [ timerLabel, setTimerLabel ] = useState( 'Session' );
  const [ timeLeft, setTimeLeft ] = useState( 25 * 60 );
  const [ isRunning, setIsRunning ] = useState( false );

  const audioRef = useRef( null );
  const intervalRef = useRef( null );


  //_____ Format time into MM:SS _____
  const formatTimeLeft = ( time ) => {
    const minutes = Math.floor( time / 60 );
    const seconds = time % 60;
    console.log( 'formatTimeLeft received:', time ); // Console log for debugging
    return `${minutes.toString().padStart( 2, '0' )}:${seconds.toString().padStart( 2, '0' )}`;
  };


  //_____ Effect for handling the timer  _____
  useEffect( () => {
    if ( isRunning ) {
      intervalRef.current = setInterval( () => {
        setTimeLeft( ( prevTime ) => prevTime - 1 );
      }, 1000 );
    } else {
      clearInterval( intervalRef.current );
    }

    return () => clearInterval( intervalRef.current );
  }, [ isRunning ] );


  //_____ Effect to handle session/break switch & play sound _____
  useEffect( () => {
    if ( timeLeft === 0 ) {
      audioRef.current.play();
      if ( timerLabel === 'Session' ) {
        setTimerLabel( 'Break' );
        setTimeLeft( breakLength * 60 );
      } else {
        setTimerLabel( 'Session' );
        setTimeLeft( sessionLength * 60 );
      }
    }
  }, [ timeLeft, breakLength, sessionLength, timerLabel ] );


  //_____ Start/Stop functionality _____
  const handleStartStop = () => {
    setIsRunning( !isRunning );
  };


  //_____ Reset functionality _____
  const handleReset = () => {
    //>>> Stop the timer:
    setIsRunning( false );

    //>>> Reset the timer to default session length:
    setTimeLeft( 25 * 60 );
    setSessionLength( 25 );
    setBreakLength( 5 );
    setTimerLabel( 'Session' );

    //>>> Reset audio:
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };


  return (
    <div className="App">

      <div className='container'>

        <div id='main-title'>25+5 Clock</div>

          
          <div className='break-session-ctrls-wrap'>
            <LengthControl
              title="Break Length"
              count={breakLength}
              decrementId="break-decrement"
              incrementId="break-increment"
              lengthId="break-length"
              labelId="break-label"
              onClickHandler={( isIncrement ) => {
                if ( !isRunning ) {
                  setBreakLength( ( prev ) =>
                    isIncrement
                      ? Math.min( prev + 1, 60 )
                      : Math.max( prev - 1, 1 )
                  );
                }
              }}
              isDisabled={isRunning}
            />
  
            <LengthControl
              title="Session Length"
              count={sessionLength}
              decrementId="session-decrement"
              incrementId="session-increment"
              lengthId="session-length"
              labelId="session-label"
              onClickHandler={( isIncrement ) => {
                if ( !isRunning ) {
                  setSessionLength( ( prev ) => {
                    const newLength = isIncrement ? Math.min( prev + 1, 60 ) : Math.max( prev - 1, 1 );
                    // Update timeLeft only if we're currently in a Session
                    if ( timerLabel === 'Session' ) {
                      setTimeLeft( newLength * 60 );
                    }
                    return newLength;
                  } );
                }
              }}
              isDisabled={isRunning}
            />
          </div>

        <div className='timer-wrapper'>
          <TimerDisplay
            label={timerLabel}
            timeLeft={formatTimeLeft( timeLeft )}
          />

          <Controls
            onStartStop={handleStartStop}
            onReset={handleReset}
          />

          {/* <button onClick={() => audioRef.current.play()}>Play Sound</button> */}

        </div>

      </div>

      <audio id='beep' ref={audioRef} src='/assets/puzzle-game-victory-melody.wav' preload='auto' />

    </div>
  );
}

export default App;
