import React from 'react';

function TimeDisplay({ hours, minutes,seconds }) {
  return (
    <div className="flip-clock">
      <div className="flip-unit" id="hours">
        {hours}
      </div>
      <div className="flip-unit" id="minutes">
        {minutes}
      </div>
      <div className="flip-unit" id="seconds">
        {seconds}
      </div>
    </div>
  );
}

export default TimeDisplay;