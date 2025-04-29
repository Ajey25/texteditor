import React, { useState } from "react";

const Heading = ({ editorRef }) => {
  const [selectedHeading, setSelectedHeading] = useState("");

  const handleHeadingChange = (e) => {
    const heading = e.target.value;
    if (heading !== "") {
      document.execCommand("formatBlock", false, heading);
      setSelectedHeading(heading);
      editorRef.current.focus();
    }
  };

  return (
    <div className="d-flex align-items-center px-1">
      {/* Heading Dropdown */}
      <select
        value={selectedHeading}
        onChange={handleHeadingChange}
        title="Heading"
        className="form-select" // Apply Bootstrap's form-select for styling
        style={{
          fontSize: "16px",
          border: "none",
          marginTop: "0.25rem",
        }}
      >
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
        <option value="h4">H4</option>
        <option value="h5">H5</option>
        <option value="h6">H6</option>
      </select>
    </div>
  );
};

export default Heading;
