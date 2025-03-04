import React from "react";
import Draggable from "react-draggable";
import "./draggable.css";

function DraggableComponent() {
  return (
    <Draggable>
      <div className="draggable-box">
      <p>Arrástrame 🖱️</p>
      </div>
    </Draggable>
  );
}

export default DraggableComponent;
