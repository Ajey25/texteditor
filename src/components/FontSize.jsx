import React, { useState } from "react";

const FontSize = ({ editorRef }) => {
  const [fontSize, setFontSize] = useState("4");

  const handleFontSizeChange = (e) => {
    const selectedSize = e.target.value;
    document.execCommand("fontSize", false, selectedSize);
    setFontSize(selectedSize);
    editorRef.current.focus();
  };

  return (
    <select
      value={fontSize}
      onChange={handleFontSizeChange}
      title="Font Size"
      style={{
        padding: "5px",
        border: "none",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      <option value="1">Small</option>
      <option value="4">Medium</option>
      <option value="5">Large</option>
      <option value="7">Large</option>
    </select>
  );
};

export default FontSize;
