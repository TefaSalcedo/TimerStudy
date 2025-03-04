import React from 'react';


function PomodoroOptions({ tradicional, mediaHora, startPomodoro}) {
  return (
    <div className="time-buttons">
      <button className="option-button" id="traditional" onClick={tradicional}>
        25 minutes
      </button>
      <button className="option-button" id="pomodoroButton" onClick={mediaHora}>
        30 minutes
      </button>
      <button className="option-button" id="deepWorkButton" onClick={startPomodoro}>
        Start
      </button>
    </div>
  );
}

export default PomodoroOptions;