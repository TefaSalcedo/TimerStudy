import React from 'react';
import "./option.css";

function TimeOptions({ onRealTimeClick, onPomodoroClick, onDeepWorkClick, onClearClick }) {
  return (
    <div className="time-options">
      <button className="time-button" id="RealTime" onClick={onRealTimeClick}>
        Real Time
      </button>
      <button className="time-button" id="pomodoroButton" onClick={onPomodoroClick}>
        Pomodoro
      </button>
      <button className="time-button" id="deepWorkButton" onClick={onDeepWorkClick}>
        Deep Work
      </button>
      <button className="time-button" id="clearButton" onClick={onClearClick}>
        Clear
      </button>
    </div>
  );
}

export default TimeOptions;