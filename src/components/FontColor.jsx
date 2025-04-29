import React, { useState } from "react";

const FontColor = ({ editorRef }) => {
  const [color, setColor] = useState("#000000");

  const handleColorChange = (e) => {
    const selectedColor = e.target.value;
    document.execCommand("foreColor", false, selectedColor);
    setColor(selectedColor);
    editorRef.current.focus();
  };

  return (
    <div className="d-flex align-items-center">
      {/* Font Color Button */}
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        title="Font Color"
        className="btn btn-light p-0" // Bootstrap button styles
        style={{
          width: "40px",
          height: "40px",
          border: "none",
          padding: "0",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default FontColor;
