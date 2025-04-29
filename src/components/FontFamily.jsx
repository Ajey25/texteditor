import React, { useState } from "react";

const FontFamily = ({ editorRef }) => {
  const [font, setFont] = useState("Times New Roman");

  const handleFontChange = (e) => {
    const selectedFont = e.target.value;
    document.execCommand("fontName", false, selectedFont);
    setFont(selectedFont);
    editorRef.current.focus();
  };

  return (
    <div className="d-flex align-items-center">
      {/* Font Family Dropdown */}
      <select
        value={font}
        onChange={handleFontChange}
        title="Font Family"
        className="form-select" // Bootstrap's form-select for styling the dropdown
        style={{
          width: "auto",
          fontSize: "16px",
          border: "none",
          marginTop: "0.2rem",
        }}
      >
        <option value="Times New Roman">Times New Roman</option>
        <option value="Arial">Arial</option>
        <option value="Courier New">Courier New</option>
        <option value="Comic Sans MS">Comic Sans MS</option>
        <option value="Impact">Impact</option>
      </select>
    </div>
  );
};

export default FontFamily;
