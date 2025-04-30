import React, { useEffect, useState } from "react";
import { RiListOrdered } from "react-icons/ri";

const OrderedList = ({ editorRef }) => {
  const [isActive, setIsActive] = useState(false);

  const handleOrderedList = () => {
    document.execCommand("insertOrderedList");
    editorRef.current.focus();
    updateActiveState();
  };

  const updateActiveState = () => {
    const active = document.queryCommandState("insertOrderedList");
    setIsActive(active);
  };

  useEffect(() => {
    const handleSelectionChange = () => updateActiveState();
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <button
      onClick={handleOrderedList}
      title="Ordered List"
      style={{
        ...styles.button,
        backgroundColor: isActive ? "#ccc" : "#fff", // light blue background if active
        borderColor: isActive ? "#ccc" : "#ccc",
      }}
    >
      <RiListOrdered />
    </button>
  );
};

const styles = {
  button: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default OrderedList;
