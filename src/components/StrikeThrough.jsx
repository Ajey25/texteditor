import React, { useEffect, useState } from "react";
import { FaStrikethrough } from "react-icons/fa";

const StrikeThrough = ({ editorRef }) => {
  const [isActive, setIsActive] = useState(false);

  const handleStrike = () => {
    document.execCommand("strikeThrough", false, null); // Apply strikethrough to selected text
    editorRef.current.focus(); // Retain focus in the editor
    updateActiveState(); // Update active state after applying strikethrough
  };

  const updateActiveState = () => {
    const active = document.queryCommandState("strikeThrough"); // Check if strikethrough is active
    setIsActive(active); // Update state based on active status
  };

  useEffect(() => {
    const handler = () => {
      updateActiveState(); // Update state when selection changes
    };

    document.addEventListener("selectionchange", handler);
    return () => {
      document.removeEventListener("selectionchange", handler); // Clean up the event listener
    };
  }, []);

  return (
    <button
      onClick={handleStrike}
      title="Strikethrough"
      className={isActive ? "active-btn" : ""} // Use Bootstrap button classes, change color when active
      style={{
        fontSize: "20px", // Icon size
        display: "flex", // Flex layout for center alignment
        alignItems: "center", // Vertical alignment
        justifyContent: "center", // Horizontal alignment
      }}
    >
      <FaStrikethrough size={20} /> {/* Font Awesome strikethrough icon */}
    </button>
  );
};

export default StrikeThrough;
