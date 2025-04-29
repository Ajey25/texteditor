import React, { useEffect, useState } from "react";
import { FaUnderline } from "react-icons/fa";

const Underline = ({ editorRef }) => {
  const [isActive, setIsActive] = useState(false);

  const handleUnderline = () => {
    document.execCommand("underline", false, null); // Apply underline to selected text
    editorRef.current.focus(); // Retain focus in the editor
    updateActiveState(); // Update the active state after applying underline
  };

  const updateActiveState = () => {
    const active = document.queryCommandState("underline"); // Check if underline is active
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
      onClick={handleUnderline}
      title="Underline"
      className={isActive ? "active-btn" : ""} // Bootstrap classes for active/inactive button
      style={{
        fontSize: "20px", // Icon size
        display: "flex", // Flex layout for center alignment
        alignItems: "center", // Vertical alignment
        justifyContent: "center", // Horizontal alignment
      }}
    >
      <FaUnderline size={20} /> {/* Font Awesome underline icon */}
    </button>
  );
};

export default Underline;
