import React from "react";
import { FaAlignCenter } from "react-icons/fa";

const AlignCenter = ({ editorRef }) => {
  const applyAlignment = () => {
    if (!editorRef?.current) return;
    editorRef.current.focus();
    document.execCommand("justifyCenter");
  };

  return (
    <button
      onClick={applyAlignment}
      title="Align Center"
      className="bg-gray-200 rounded hover:bg-gray-300"
      style={{ marginTop: "4px" }}
    >
      <FaAlignCenter />
    </button>
  );
};

export default AlignCenter;
