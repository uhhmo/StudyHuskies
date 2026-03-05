import React from 'react';
import wizard from '../assets/wizard.png';

function ProgressBar(props) {
  const widthPercent = (props.current / props.total) * 100;


  // IDK HOW TO MAKE THE WIZARD MOVE PLS HELP
  return (
    <div>
      <img src={wizard} className="wizard" style={{ right: + "px"}}/>
      <div className="progress mt-2">
        <div
          className="progress-bar bg-dark"
          style={{ width: widthPercent + "%" }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
