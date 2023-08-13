import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import CityFarAway from '..//src//assets//bg-images//darkcity.jpg'
import CampFire from '..//src//assets//bg-images//citymoon.jpg'
import SchoolGirls from '..//src//assets//bg-images//lunar.png'
import Empire from '..//src//assets//bg-images//empirestatetower.png'
import alarmSound from '../src//alarm-sounds/alarm.mp3';

const CountdownTimer = () => {
  const timerRef = useRef(null);
  const [countDown, setCountDown] = useState(1500); // 25 minutes in seconds
  const [started, setStarted] = useState(false);
  const [resetTimer, setResetTimer] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [backImg, setBackimg] = useState("");
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); 
  const audioRef = useRef(new Audio(alarmSound));

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
    setCountDown(5);
    setResetTimer(2);
    setStarted(false);
    console.log(countDown);
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
      // console.log(timerRef.current.innerHTML);
      const minutes = Math.floor(countDown / 60);
      const seconds = countDown % 60;
      timerRef.current.innerHTML = formatTime(minutes) + ':' + formatTime(seconds);
      document.title = timerRef.current.innerHTML + " | Pomodoro";  
      if(minutes == '00' && seconds == '00' && started){
          audioRef.current.play();
      }else{
        audioRef.current.pause();
      }
    }
  }, [countDown, started]);


  const changeBg1 = () =>{
   document.body.style.backgroundImage = `url('${CityFarAway}')`;
   document.body.style.backgroundSize = 'cover'; // Set background-size to cover
  document.body.style.width = '100%'; // Set width to 100%
  // document.body.style.backgroundPosition = '70% 50%';
 
  };

  const changeBg2 = () =>{
    document.body.style.backgroundImage = `url('${CampFire}')`;
    document.body.style.backgroundSize = 'cover'; // Set background-size to cover
  document.body.style.width = '100%'; // Set width to 100%
  };

  const changeBg3 = () =>{
    document.body.style.backgroundImage = `url('${SchoolGirls}')`;
    document.body.style.backgroundSize = 'cover'; // Set background-size to cover
  document.body.style.width = '100%'; // Set width to 100%
  };

  const changeBg4 = () =>{
    document.body.style.backgroundImage = `url('${Empire}')`;
    document.body.style.backgroundSize = 'cover'; // Set background-size to cover
  document.body.style.width = '100%'; // Set width to 100%
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
        <audio id="alarmSound" src="..//src//assets//alarm-sounds//alarm.mp3"></audio>
        <h1 className="analogTimer"  ref={timerRef}>25:00</h1>
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
