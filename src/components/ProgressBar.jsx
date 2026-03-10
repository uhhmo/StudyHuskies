import React from 'react';
import wizard from '../assets/wizard.png';

function ProgressBar(props) {
  const widthPercent = ((props.current + 1) / props.total) * 100;
  const wizardPosition = widthPercent;


  // IDK HOW TO MAKE THE WIZARD MOVE PLS HELP
  return (
    <div>
      <div style={{ width: "100%" }}>
        <img
          src={wizard}
          className="wizard"
          style={{ marginLeft: wizardPosition + "%" }}
        />
      </div>
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
