import React, { useEffect, useState } from "react";
import { FaBold } from "react-icons/fa";

const Bold = ({ editorRef }) => {
  const [isActive, setIsActive] = useState(false);

  const handleBold = () => {
    document.execCommand("bold", false, null);
    editorRef.current.focus();
    updateActiveState(); // force update right after clicking
  };

  const updateActiveState = () => {
    const active = document.queryCommandState("bold");
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
      onClick={handleBold}
      title="Bold"
      className={isActive ? "active-btn" : ""}
    >
      <FaBold />
    </button>
  );
};

export default Bold;
