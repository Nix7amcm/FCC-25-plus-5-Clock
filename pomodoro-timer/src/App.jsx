import React, { useState, useEffect, useRef } from 'react';
import TimerDisplay from './components/TimerDisplay';
import LengthControl from './components/LengthControl';
import Controls from './components/Controls';
import './styles/App.css';


function App () {

  //_____ State variables:
  const [ breakLength, setBreakLength ] = useState( 5 );
  const [ sessionLength, setSessionLength ] = useState( 25 );
  const [ timerLabel, setTimerLabel ] = useState( 'Focus Time! 🚀' );
  const [ timeLeft, setTimeLeft ] = useState( 25 * 60 );
  const [ isRunning, setIsRunning ] = useState( false );


  //_____ Refs:
  const audioRef = useRef( null );
  const intervalRef = useRef( null );


  //_____ Format time into MM:SS:
  const formatTimeLeft = ( time ) => {
    const minutes = Math.floor( time / 60 ); //--- Calculate the minutes by dividing time by 60
    const seconds = time % 60; //--- Calculate the seconds by getting the remainder of time divided by 60
    return `${minutes.toString().padStart( 2, '0' )}:${seconds.toString().padStart( 2, '0' )}`; //--- Return the formatted time as a string
  };


  //_____ Effect for handling the timer:
  useEffect( () => {
    if ( isRunning ) {
      //>>> If the timer is running, set an interval to decrement the timeLeft by 1 every second:
      intervalRef.current = setInterval( () => {
        setTimeLeft( ( prevTime ) => prevTime - 1 );
      }, 1000 );
    } else {
      //>>> If the timer is not running, clear the interval:
      clearInterval( intervalRef.current );
    }

    //>>> Clean up the interval when the component unmounts or when isRunning changes:
    return () => clearInterval( intervalRef.current );
  }, [ isRunning ] );


  //_____ Effect to handle session/break switch & play sound:
  useEffect( () => {
    if ( timeLeft === 0 ) {
      audioRef.current.play(); //--- Play the end-of-time sound

      //>>> Switch from session to break or break to session:
      setTimerLabel( ( prevLabel ) => {
        //>>> If the previous label was "Focus Time!", set the new label to "Break Time!" and vice versa:
        if ( prevLabel === 'Focus Time! 🚀' ) {
          setTimeLeft( breakLength * 60 ); //--- Set timeLeft for a break
          return 'Break Time! 🦥';
        } else {
          setTimeLeft( sessionLength * 60 ); //--- Set timeLeft for a session
          return 'Focus Time! 🚀';
        }
      } );
    }
  }, [ timeLeft, breakLength, sessionLength, timerLabel ] );


  //_____ Start/Stop functionality:
  const handleStartStop = () => {
    setIsRunning( !isRunning );
  };


  //_____ Reset functionality:
  const handleReset = () => {
    //>>> Stop the timer:
    setIsRunning( false );

    //>>> Reset the timer to default session length:
    setTimeLeft( 25 * 60 );
    setSessionLength( 25 );
    setBreakLength( 5 );

    //>>> Reset the timer label back to "Focus Time!":
    setTimerLabel( 'Focus Time! 🚀' );

    //>>> Reset audio:
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };


  return (
    <div className="App">
      <div className="container">
        <header id="main-title">
          <h1>25+5 Clock</h1>
          <h2>'Pomodoro Timer'</h2>
        </header>

        <div className="break-session-ctrls-wrap">
          <LengthControl
            title="Break"
            count={breakLength}
            decrementId="break-decrement"
            incrementId="break-increment"
            lengthId="break-length"
            labelId="break-label"
            onClickHandler={( isIncrement ) => {
              if ( !isRunning ) {
                setBreakLength( ( prev ) => {
                  const newLength = isIncrement ? Math.min( prev + 1, 60 ) : Math.max( prev - 1, 1 );
                  if ( timerLabel === 'Break Time! 🦥' ) {
                    setTimeLeft( newLength * 60 );
                  }
                  return newLength;
                } );
              }
            }}
            isDisabled={isRunning}
          />

          <img src="/assets/icons8-timer-100.png" alt="arrow" />

          <LengthControl
            title="Session"
            count={sessionLength}
            decrementId="session-decrement"
            incrementId="session-increment"
            lengthId="session-length"
            labelId="session-label"
            onClickHandler={( isIncrement ) => {
              if ( !isRunning ) {
                setSessionLength( ( prev ) => {
                  const newLength = isIncrement ? Math.min( prev + 1, 60 ) : Math.max( prev - 1, 1 );
                  if ( timerLabel === 'Focus Time 🚀' ) {
                    setTimeLeft( newLength * 60 );
                  }
                  return newLength;
                } );
              }
            }}
            isDisabled={isRunning}
          />
        </div>

        <div className="timer-wrapper">
          <TimerDisplay label={timerLabel} timeLeft={formatTimeLeft( timeLeft )} />

          <Controls onStartStop={handleStartStop} onReset={handleReset} />

          {/* <button onClick={() => audioRef.current.play()}>Play Sound</button> */}{/*--- For testing the sound---*/}
        </div>
      </div>

      <footer>
        <p className="footer-me">
          Coded by{' '}
          <a className="footer-link" href="https://github.com/Nix7amcm" target="_blank" rel="noopener noreferrer">
            Nix7amcm
          </a>
          ⚡
        </p>

        <p className="footer-credit">
          <a className="footer-link" href="https://icons8.com/icons/set/timer" target="_blank" rel="noopener noreferrer">
            Timer
          </a>{' '}
          icon by{' '}
          <a className="footer-link" href="https://icons8.com" target="_blank" rel="noopener noreferrer">
            Icons8
          </a>
        </p>
      </footer>

      <audio id="beep" ref={audioRef} src="/assets/puzzle-game-victory-melody.wav" preload="auto" />
    </div>
  );
}

export default App;
