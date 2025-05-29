import React from 'react';

function DeepWorkOptions({
  startDeepWork,
  pauseDeepWork,
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
    <div className="time-buttons-deep-work">
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