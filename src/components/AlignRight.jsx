import React from "react";
import { FaAlignRight } from "react-icons/fa";

const AlignRight = ({ editorRef }) => {
  const applyAlignment = () => {
    if (!editorRef?.current) return;
    editorRef.current.focus();
    document.execCommand("justifyRight");
  };

  return (
    <button
      onClick={applyAlignment}
      title="Align Right"
      className="bg-gray-200 rounded hover:bg-gray-300"
      style={{ marginTop: "4px" }}
    >
      <FaAlignRight />
    </button>
  );
};

export default AlignRight;
