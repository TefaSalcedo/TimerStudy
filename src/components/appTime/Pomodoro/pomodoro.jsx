import React from 'react';


function PomodoroOptions({ tradicional, mediaHora, startPomodoro,pausePomodoro}) {
  return (
    <div className="time-buttons-pomodoro">
      <button className="option-button" id="traditional" onClick={tradicional}>
        25 minutes
      </button>
      <button className="option-button" id="pomodoroButton" onClick={mediaHora}>
        30 minutes
      </button>
      <button className="option-button" id="startPomodoro" onClick={startPomodoro}>
        Start
      </button>
      <button className="option-button" id="pausePomodoro" onClick={pausePomodoro}>
        Pause
      </button>
    </div>
  );
}

export default PomodoroOptions;