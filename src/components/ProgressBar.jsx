import React from 'react';
import wizard from '../assets/wizard.png';

function ProgressBar(props) {

  const wizardPosition = (props.current / props.total) * 100;

  return (
    <div style={{ width: "100%", paddingBottom: "8px" }}>
      
      {/* Wizard track */}
      <div style={{ position: "relative", width: "100%", height: "48px", marginBottom: "4px" }}>
        <img
          src={wizard}
          className="wizard"
          style={{
            position: "absolute",
            left: wizardPosition + "%",
            bottom: 0,
            transition: "left 0.5s ease",
            height: "40px",
          }}
        />
      </div>

      {/* Progress bar */}
      <div className="progress">
        <div
          className="progress-bar bg-dark"
          style={{
            width: wizardPosition + "%",
            transition: "width 0.5s ease",
          }}
        />
      </div>

    </div>
  );
}

export default ProgressBar;
