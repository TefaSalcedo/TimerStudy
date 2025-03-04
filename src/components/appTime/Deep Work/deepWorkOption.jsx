import React from 'react';
import "./deepWork.css"

function DeepWorkOptions({ oneHour, oneHourAndHalf, startDeepWork,pauseDeepWork}) {
  return (
    <div className="time-buttons-deep-work">
      <button className="option-button" id="traditional" onClick={oneHour}>
        1:00 hour
      </button>
      <button className="option-button" id="pomodoroButton" onClick={oneHourAndHalf}>
        1:30 hour
      </button>
      <button className="option-button" id="startDeepWork" onClick={startDeepWork}>
        Start
      </button>
      <button className="option-button" id="pauseDeepWork" onClick={pauseDeepWork}>
        Pause
      </button>
    </div>
  );
}

export default DeepWorkOptions;

