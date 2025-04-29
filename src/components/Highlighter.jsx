import React from "react";

import { FaHighlighter } from "react-icons/fa";

const SimpleHighlighter = ({ editorRef }) => {
  const toggleHighlight = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString().trim();

    if (!selectedText) return;

    const container = range.commonAncestorContainer;

    // If text is already highlighted
    if (
      container.parentNode &&
      container.parentNode.classList.contains("simple-highlight")
    ) {
      const highlightSpan = container.parentNode;
      const parent = highlightSpan.parentNode;

      while (highlightSpan.firstChild) {
        parent.insertBefore(highlightSpan.firstChild, highlightSpan);
      }
      parent.removeChild(highlightSpan);
    } else {
      // Apply highlight
      const span = document.createElement("span");
      span.style.backgroundColor = "yellow";
      span.className = "simple-highlight";

      try {
        range.surroundContents(span);
      } catch (e) {
        console.error("Could not highlight selection:", e);
      }

      selection.removeAllRanges();
    }
  };

  return (
    <button
      onClick={toggleHighlight}
      className="p-2 bg-yellow-400 rounded text-black font-bold hover:bg-yellow-500"
    >
      <FaHighlighter />
    </button>
  );
};

export default SimpleHighlighter;
