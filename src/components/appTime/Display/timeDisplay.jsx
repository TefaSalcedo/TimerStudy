import React from 'react';

function TimeDisplay({ hours, minutes }) {
  return (
    <div className="flip-clock">
      <div className="flip-unit" id="hours">
        {hours}
      </div>
      <div className="flip-unit" id="minutes">
        {minutes}
      </div>
    </div>
  );
}

export default TimeDisplay;