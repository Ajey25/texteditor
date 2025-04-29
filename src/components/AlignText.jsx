import React from "react";
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";

const AlignText = ({ editorRef }) => {
  const applyAlignment = (alignment) => {
    if (!editorRef?.current) return;
    editorRef.current.focus();
    document.execCommand(`justify${alignment}`);
  };

  return (
    <div className="d-flex ">
      <button
        onClick={() => applyAlignment("Left")}
        title="Align Left"
        className=" bg-gray-200 rounded hover:bg-gray-300"
        style={{ marginTop: "3px" }}
      >
        <FaAlignLeft />
      </button>
      <button
        onClick={() => applyAlignment("Center")}
        title="Align Center"
        className=" bg-gray-200 rounded hover:bg-gray-300"
        style={{ marginTop: "3px" }}
      >
        <FaAlignCenter />
      </button>
      <button
        onClick={() => applyAlignment("Right")}
        title="Align Right"
        className=" bg-gray-200 rounded hover:bg-gray-300"
        style={{ marginTop: "3px" }}
      >
        <FaAlignRight />
      </button>
    </div>
  );
};

export default AlignText;
