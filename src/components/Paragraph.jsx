import React, { useEffect, useState } from "react";
import { TbSeparatorVertical } from "react-icons/tb";

const Paragraph = ({ editorRef }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleSelectionChange = () => {
      const editor = editorRef.current;
      if (!editor) return;

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      if (!editor.contains(range.commonAncestorContainer)) return;

      const parentBlock = getBlockElement(range.startContainer);
      if (parentBlock && parentBlock.tagName === "P") {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, [editorRef]);

  const getBlockElement = (el) => {
    while (el && el !== editorRef.current) {
      if (el.nodeType === 1 && /^H[1-6]|P$/.test(el.tagName)) {
        return el;
      }
      el = el.parentNode;
    }
    return null;
  };

  const handleClick = () => {
    const editor = editorRef.current;
    if (!editor) return;

    document.execCommand("formatBlock", false, "p");
    editor.focus();
    setIsActive(true);
  };

  return (
    <button
      className={isActive ? "active-btn" : ""}
      onClick={handleClick}
      title="Paragraph"
    >
      <TbSeparatorVertical />{" "}
    </button>
  );
};

export default Paragraph;
