import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

const CountdownTimer = () => {
  const timerRef = useRef(null);
  const [countDown, setCountDown] = useState(1500); // 25 minutes in seconds
  const [started, setStarted] = useState(false);
  const [resetTimer, setResetTimer] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [backImg, setBackimg] = useState("");
  //need a useState for what type of countdown it is currently, 
  //the button for shortbreak updates the timer but when resetted it only resets to the pomodoro time not the shortbreak time


  const formatTime = (time) => {
    return time < 10 ? '0' + time : time;
  };

  const start = () => {
    setStarted((prevStarted) => !prevStarted); // Toggle the started state
  };

  const reset = () => {
    if(resetTimer === 1){
      pomo();
    }else if(resetTimer === 2){
      shortBreak();
    }else{ 
      longBreak();
    }
};

  const pomo = () => {
    setResetTimer(1)
    setCountDown(1500);
    setStarted(false);
  };
  

  const shortBreak = () =>{
    setCountDown(300);
    setResetTimer(2);
    setStarted(false);
  };

  const longBreak = () =>{
    setCountDown(600);
    setResetTimer(3)
    setStarted(false);
  };

  useEffect(() => {
    if (started && countDown > 0) {
      const intervalId = setInterval(() => {
        setCountDown((prevCountDown) => prevCountDown - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [started, countDown]);

  useEffect(() => {
    if (timerRef.current) {
      console.log(timerRef.current);
      const minutes = Math.floor(countDown / 60);
      const seconds = countDown % 60;
      timerRef.current.innerHTML = formatTime(minutes) + ':' + formatTime(seconds);
    }
  }, [countDown]);

  const changeBg1 = () =>{
   document.body.style.backgroundImage = `url('${`.//src//assets//bg-images//girlwaiting.gif`}')`;
  };

  const changeBg2 = () =>{
    document.body.style.backgroundImage = `url('${`.//src//assets//bg-images//campfire.gif`}')`;
  };

  const changeBg3 = () =>{
    document.body.style.backgroundImage = `url('${`.//src//assets//bg-images//raining.gif`}')`;
  };

  const changeBg4 = () =>{
    document.body.style.backgroundImage = `url('${`.//src//assets//bg-images//empirestatetower.png`}')`;
  };

  const handleOnSave = (bg) =>{
    setBackimg(bg);
    if(backImg === 1){
      changeBg1();
    }else if (backImg === 2){
      changeBg2();
    }else if(backImg === 3){
      changeBg3()
    }
    else{
      changeBg4();
    }
    
  };
  
  
  return (
    <div className="main">
      <Modal open={isOpen} onClose={()=> setIsOpen(false)} onSave={handleOnSave}></Modal>
      <div className="timerContainer">
        <div className="durations">
        <button className="pomodoro-btn" onClick={pomo}>Pomodoro</button>
        <button className="shortBreak-btn" onClick={shortBreak}>Short Break</button>
        <button className="longBreak-btn" onClick={longBreak}>Long Break</button>
        </div>
        <h1 className="analogTimer" ref={timerRef}>25:00</h1>
        <div className="bottomButtons">
        <button className="startStop" onClick={start}>{started ? 'Stop' : 'Start'}</button>
        <button className="undoIcon" onClick={reset}><FontAwesomeIcon icon={faUndo} flip="horizontal" /></button>
        <button className="gearIcon" onClick={()=> setIsOpen(true) }><FontAwesomeIcon icon={faGear} /></button>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
