import React from "react";
import { GrBlockQuote } from "react-icons/gr";

const Blockquote = ({ editorRef }) => {
  const handleBlockquote = () => {
    if (!editorRef.current) return;

    editorRef.current.focus();
    document.execCommand("formatBlock", false, "blockquote");
  };

  return (
    <button
      onClick={handleBlockquote}
      title="Insert Blockquote"
      style={{ marginTop: "4px" }}
    >
      <GrBlockQuote />{" "}
    </button>
  );
};

export default Blockquote;
