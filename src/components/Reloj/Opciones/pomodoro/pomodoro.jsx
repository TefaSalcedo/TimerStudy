import React from 'react';

function PomodoroOptions({
  startPomodoro,
  pausePomodoro,
  show,
  inputValue,
  onInputChange,
  breakValue,
  onBreakChange,
  min,
  max,
  breakMin,
  breakMax
}) {
  if (!show) return null;
  return (
    <div className="time-buttons-pomodoro">
      <div>
        <label>
          Tiempo de trabajo (min):
          <input
            type="number"
            min={min}
            max={max}
            value={inputValue}
            onChange={onInputChange}
            style={{ width: 60, marginLeft: 8 }}
          />
        </label>
      </div>
      <div>
        <label>
          Descanso (min):
          <input
            type="number"
            min={breakMin}
            max={breakMax}
            value={breakValue}
            onChange={onBreakChange}
            style={{ width: 60, marginLeft: 8 }}
          />
        </label>
      </div>
      
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