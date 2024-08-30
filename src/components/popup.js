import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'

const Popup = ({ message, show, setShow, duration = 3000, isClicked}) => {
  useEffect(() => {
    if (show) {
      // Set a timer to auto-hide the toast after a certain duration
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer); // Cleanup the timer on component unmount or re-render
    }
  }, [show, setShow, duration]);

  return (
    <div
      className={`toast-container p-3 ${show ? 'show' : 'hide'}`}
      style={{ zIndex: 9999, top:"80px", right:"30px", color:isClicked?"lightgreen":"tomato", width:"300px"}}
    >
       <div className={`toast ${show ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true"> 
       
        <div className="toast-body" 
        style={{fontSize:"16px"}}
        >{message}
        {/* <button
            type="button"
            className="btn-close"
            onClick={() => setShow(false)}
            aria-label="Close"
          ></button> */}
        </div>
      </div>
    </div>
  );
 };

export default Popup;