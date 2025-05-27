import React, { useState, useRef } from "react";
import { EmojiPicker } from "frimousse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import "./diseño.css";

const EmojiButton = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef();

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        type="button"
        ref={buttonRef}
        className="emoji-mini-btn"
        onClick={() => setOpen((v) => !v)}
        tabIndex={-1}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "1.3rem",
          marginLeft: "4px",
        }}
        aria-label="Elegir emoji"
      >
        <FontAwesomeIcon icon={faSmile} />
      </button>
      {open && (
        <div className="container-emoji">
          <EmojiPicker.Root onEmojiSelect={onSelect} columns={4}>
            <EmojiPicker.Viewport>
              <EmojiPicker.Loading>Loading…</EmojiPicker.Loading>
              <EmojiPicker.Empty>No emoji found.</EmojiPicker.Empty>
              <EmojiPicker.List />
            </EmojiPicker.Viewport>
          </EmojiPicker.Root>

        </div>
      )}
    </div>
  );
}

export default EmojiButton;