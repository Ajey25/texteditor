import React from "react";
import { FaAlignLeft } from "react-icons/fa";

const AlignLeft = ({ editorRef }) => {
  const applyAlignment = () => {
    if (!editorRef?.current) return;
    editorRef.current.focus();
    document.execCommand("justifyLeft");
  };

  return (
    <button
      onClick={applyAlignment}
      title="Align Left"
      className="bg-gray-200 rounded hover:bg-gray-300"
      style={{ marginTop: "4px" }}
    >
      <FaAlignLeft />
    </button>
  );
};

export default AlignLeft;
