// TextEditor.jsx
import React, { useRef, useState, useEffect } from "react";
import Bold from "./Bold";
import Italic from "./Italic";
import Underline from "./Underline";
import StrikeThrough from "./StrikeThrough";
import Heading from "./Heading";
import FontColor from "./FontColor";
import FontSize from "./FontSize";
import FontFamily from "./FontFamily";
import OrderedList from "./OrderedList";
import UnorderedList from "./UnorderedList";
import Highlighter from "./Highlighter";
import AlignText from "./AlignText";
import { FaEllipsisV } from "react-icons/fa";

const TextEditor = () => {
  const editorRef = useRef(null);
  const [showMore, setShowMore] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="editor-wrapper" style={{ padding: "10px" }}>
      <div
        className="toolbar"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "8px",
          position: "relative",
        }}
      >
        <Bold editorRef={editorRef} />
        <Italic editorRef={editorRef} />
        <Underline editorRef={editorRef} />
        <StrikeThrough editorRef={editorRef} />
        <Highlighter editorRef={editorRef} />
        <FontColor editorRef={editorRef} />
        <OrderedList editorRef={editorRef} />
        <UnorderedList editorRef={editorRef} />
        <AlignText editorRef={editorRef} />

        {/* Desktop only */}
        {!isMobileView && (
          <>
            <Heading editorRef={editorRef} />
            <FontSize editorRef={editorRef} />
            <FontFamily editorRef={editorRef} />
          </>
        )}

        {/* Mobile triple dot menu */}
        {isMobileView && (
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowMore((prev) => !prev)}
              style={{
                background: "none",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "4px 6px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              <FaEllipsisV />
            </button>

            {showMore && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  left: 0,
                  background: "white",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  display: "flex",
                  gap: "10px",
                  zIndex: 1000,
                }}
              >
                <Heading editorRef={editorRef} />
                <FontSize editorRef={editorRef} />
                <FontFamily editorRef={editorRef} />
              </div>
            )}
          </div>
        )}
      </div>

      <div
        ref={editorRef}
        contentEditable
        className="editor-area"
        suppressContentEditableWarning={true}
        style={{
          marginTop: "20px",
          minHeight: "200px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "6px",
        }}
      ></div>
    </div>
  );
};

export default TextEditor;
