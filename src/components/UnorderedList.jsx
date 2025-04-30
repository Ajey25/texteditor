import React, { useEffect, useState } from "react";
import { RiListUnordered } from "react-icons/ri";

const UnorderedList = ({ editorRef }) => {
  const [isActive, setIsActive] = useState(false);

  const handleUnorderedList = () => {
    document.execCommand("insertUnorderedList"); // Apply unordered list formatting
    editorRef.current.focus(); // Retain focus in the editor
    updateActiveState(); // Update the active state after applying the unordered list
  };

  const updateActiveState = () => {
    const active = document.queryCommandState("insertUnorderedList"); // Check if unordered list is active
    setIsActive(active); // Update state based on active status
  };

  useEffect(() => {
    const handleSelectionChange = () => updateActiveState(); // Update active state when selection changes
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange); // Clean up the event listener
    };
  }, []);

  return (
    <button
      onClick={handleUnorderedList}
      title="Unordered List"
      className={isActive ? "active-btn" : ""} // Bootstrap button with conditional active state
      style={{
        fontSize: "20px", // Icon size
        display: "flex", // Flex layout for center alignment
        alignItems: "center", // Vertical alignment
        justifyContent: "center", // Horizontal alignment
      }}
    >
      <RiListUnordered /> {/* Font Awesome unordered list icon */}
    </button>
  );
};

export default UnorderedList;
