import React from "react";
import "./pom.css";
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
  breakMax,
}) {

  if (!show) return null;
  return (
    <div className="container-timer">
      <label>Tiempo de trabajo (min):</label>
      <input
        type="number"
        min={min}
        max={max}
        value={inputValue}
        onChange={onInputChange}
        style={{ width: 60, marginLeft: 8 }}
      />

      <label>Descanso (min):</label>
      <input
        type="number"
        min={breakMin}
        max={breakMax}
        value={breakValue}
        onChange={onBreakChange}
        style={{ width: 60, marginLeft: 8 }}
      />
      <div className="botones">
        <button id="startPomodoro" onClick={startPomodoro}>
          Start
        </button>
        <button id="pausePomodoro" onClick={pausePomodoro}>
          Pause
        </button>
      </div>
    </div>
  );
}

export default PomodoroOptions;
