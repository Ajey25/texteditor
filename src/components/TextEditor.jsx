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
import { HiEllipsisVertical } from "react-icons/hi2";
import Paragraph from "./Paragraph";
import Table from "./Table"; // Import the Table component
import AlignCenter from "./AlignCenter";
import AlignLeft from "./AlignLeft";
import AlignRight from "./AlignRight";
import Link from "./Link";
import Blockquote from "./Blockquote"; // Import the Blockquote component

const TextEditor = () => {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Load saved content on mount
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      editorRef.current.innerHTML = savedContent;
      setEditorContent(savedContent);
    }
  }, []);

  useEffect(() => {
    // Save every time content changes
    localStorage.setItem("editorContent", editorContent);
    console.log("Saved to localStorage:", editorContent);
  }, [editorContent]);

  return (
    <div className="editor-wrapper" style={{ padding: "0px" }}>
      <div
        className="toolbar"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          position: "relative",
          padding: "0px 8px",
        }}
      >
        <Bold editorRef={editorRef} />
        <Italic editorRef={editorRef} />
        <Underline editorRef={editorRef} />
        <StrikeThrough editorRef={editorRef} />
        <hr />
        <Paragraph editorRef={editorRef} />
        {/* <Highlighter editorRef={editorRef} /> */}{" "}
        <Link editorRef={editorRef} />
        <FontColor editorRef={editorRef} />
        <hr />
        <OrderedList editorRef={editorRef} />
        <UnorderedList editorRef={editorRef} />
        {/* Desktop only */}
        {!isMobileView && (
          <>
            <Table editorRef={editorRef} />
            <Blockquote editorRef={editorRef} />
            <hr />
            <AlignLeft editorRef={editorRef} />
            <AlignCenter editorRef={editorRef} />
            <AlignRight editorRef={editorRef} />
            <hr />
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
                cursor: "pointer",
              }}
            >
              <HiEllipsisVertical size={20} />
            </button>

            {showMore && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  left: -250,
                  background: "white",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  display: "flex",
                  gap: "5px",
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(1, 1fr)",
                    flexDirection: "column",
                    gap: "0px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "0px",
                      borderBottom: "1px solid #ccc",
                    }}
                  >
                    <Table editorRef={editorRef} />
                    <Link editorRef={editorRef} />
                    <Blockquote editorRef={editorRef} />
                    <hr />
                    <AlignLeft editorRef={editorRef} />
                    <AlignCenter editorRef={editorRef} />
                    <AlignRight editorRef={editorRef} />
                    <hr />
                    <Heading editorRef={editorRef} />
                  </div>
                  <div style={{ display: "flex", gap: "0px" }}>
                    <FontSize editorRef={editorRef} />
                    <FontFamily editorRef={editorRef} />
                  </div>
                </div>
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
        onInput={() => setEditorContent(editorRef.current.innerHTML)}
        style={{
          minHeight: "200px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "6px",
        }}
      ></div>
      <div style={{ marginTop: "20px" }}>
        <h4>🧾 Raw Saved HTML:</h4>
        <pre
          style={{
            background: "#f4f4f4",
            padding: "10px",
            borderRadius: "4px",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          {editorContent}
        </pre>
      </div>
    </div>
  );
};

export default TextEditor;
