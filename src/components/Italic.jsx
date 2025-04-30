import React, { useEffect, useState } from "react";
import { HiItalic } from "react-icons/hi2";

const Italic = ({ editorRef }) => {
  const [isActive, setIsActive] = useState(false);

  const handleItalic = () => {
    document.execCommand("italic", false, null);
    editorRef.current.focus();
    updateActiveState();
  };

  const updateActiveState = () => {
    const active = document.queryCommandState("italic");
    setIsActive(active);
  };

  useEffect(() => {
    const handler = () => {
      updateActiveState();
    };

    document.addEventListener("selectionchange", handler);
    return () => {
      document.removeEventListener("selectionchange", handler);
    };
  }, []);

  return (
    <button
      onClick={handleItalic}
      title="Italic"
      className={isActive ? "active-btn" : ""}
    >
      <HiItalic />{" "}
    </button>
  );
};

export default Italic;
