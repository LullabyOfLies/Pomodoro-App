import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
const Popup = () => {
  return (
     <div className="popMainWrapper">
       <div className="popContainer">
              <div className="pop-header">
              <button><FontAwesomeIcon icon={faXmark} size="2xs" /></button>
              </div>
              <div className="pop-body">
                     <h4>body</h4>
              </div>
              <div className="pop-footer">
                     <h4>footer</h4>
              </div>
       </div>
    </div>  
  )
}

export default Popup