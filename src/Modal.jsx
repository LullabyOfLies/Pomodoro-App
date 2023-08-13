import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './ModalStyles.css'


export default function Modal({open, children, onClose, onSave}) {
  const [imgCounter, setImgCounter] = useState('trainstation')

  const handleOption = () =>{
    const optionSelect = document.getElementById('themeSelect').value;
    setImgCounter(optionSelect);
  };

  // const forCampFire = () =>{
  //   document.body.style.backgroundImage = "url('campfire.gif'')"; 
  //   return "url('campfire.gif'')"; 
  // };

  // const forTrainStation = () =>{
  //   document.body.style.backgroundImage = "url('girlwaiting.gif'')";
  // };

  // const forRain = () =>{
  //   document.body.style.backgroundImage = "url('raining.gif'')";
  // };

  const handleOptionSave = (bg1) =>{
    let bg = bg1;
      if(imgCounter == 'trainstation'){
        bg = 1;
        // console.log("change to campfire gif");
      }else if(imgCounter == 'campfire'){
        console.log("here")
        bg = 2;
        // console.log("change to trainstation");
      }else if(imgCounter == 'raining'){
        bg = 3;
        // console.log("change to rain");
      }else if(imgCounter == 'empirestatetower'){
        bg = 4;
        // console.log("change to empirestatetower");
      }
      
      onSave(bg);
      
  };
      

  if(!open) return null
  return (
     <>
      <div className='OVERLAY_STYLES'/>
      <div className='MODAL_STYLES'>
      <div className="MODAL-CONTAINER">
      <div className="MODAL_HEAD"><button onClick={onClose} className="closeBtn"><FontAwesomeIcon icon={faXmark} size="xl" /></button></div>

      <div className="MODAL_BODY">
        <div className="MODAL_BODY_SETTINGS">
          <nav>
            <ul>
              <li>General</li>
              <li>Timers<span> (WIP)</span></li>
              <li>Sounds<span> (WIP)</span> </li>
            </ul>
          </nav>
        </div>
        <div className="MODAL_GENERAL_TAB">
          <label>Select theme:</label>
          <div className="select-wrapper">
            <select id="themeSelect" onChange={handleOption}>
              <option id="selections" value="" onClick={handleOptionSave(0)}>Select Background</option>
              <option id="selections" value="trainstation" onClick={handleOptionSave(1)}>Night City</option>
              <option id="selections" value="campfire" onClick={handleOptionSave(2)}>City Moon</option>
              <option  id="selections"  value="raining" onClick={handleOptionSave(3)}>Lunar</option>
              <option  id="selections"  value="empirestatetower" onClick={handleOptionSave(4)}>Empire State</option>
          </select>
          </div>
          {/* <button onClick={handleOptionSave}>Save</button> */}
        <p>Have feature requests, or an issue to report? Fill out our quick feedback form here and join our Discord Community.</p>
        <p>Pomodoorz is not related to the Pomodoro Technique™ trademark holder Cirillo Company and respects its trademarks. Pomodoro Technique® and Pomodoro® are registered trademarks of Francesco Cirillo.</p>
        </div>
      {children}
      </div>

      <div className="MODAL_FOOTER">
        
        <button onClick={onClose} className="MODAL_FOOTER_CLOSE">Close</button>
        <button onClick={onClose} className="MODAL_FOOTER_SAVE">Save Changes</button></div>
     
      </div>
      </div>
    </>
  )
}
