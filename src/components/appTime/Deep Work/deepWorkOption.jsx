import React from 'react';
import "./deepWork.css"

function DeepWorkOptions({ oneHour, oneHourAndHalf, startDeepWork}) {
  return (
    <div className="time-buttons">
      <button className="option-button" id="traditional" onClick={oneHour}>
        1:00 hour
      </button>
      <button className="option-button" id="pomodoroButton" onClick={oneHourAndHalf}>
        1:30 hour
      </button>
      <button className="option-button" id="deepWorkButton" onClick={startDeepWork}>
        Start
      </button>
    </div>
  );
}

export default DeepWorkOptions;

