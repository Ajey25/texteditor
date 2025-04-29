// ResponsiveToolbar.jsx
import React, { useRef, useState, useEffect } from "react";
import { FaEllipsisV } from "react-icons/fa";
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

const Toolbar = ({ editorRef }) => {
  const containerRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        const isOver =
          containerRef.current.scrollWidth > containerRef.current.clientWidth;
        setIsOverflowing(isOver);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const alwaysVisible = [
    <Bold editorRef={editorRef} key="bold" />,
    <Italic editorRef={editorRef} key="italic" />,
    <Underline editorRef={editorRef} key="underline" />,
    <StrikeThrough editorRef={editorRef} key="strike" />,
    <Highlighter editorRef={editorRef} key="highlight" />,
    <FontColor editorRef={editorRef} key="fontColor" />,
    <OrderedList editorRef={editorRef} key="ordered" />,
    <UnorderedList editorRef={editorRef} key="unordered" />,
    <AlignText editorRef={editorRef} key="align" />,
  ];

  const maybeOverflow = [
    <Heading editorRef={editorRef} key="heading" />,
    <FontSize editorRef={editorRef} key="fontSize" />,
    <FontFamily editorRef={editorRef} key="fontFamily" />,
  ];

  return (
    <div
      className="toolbar"
      ref={containerRef}
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "8px",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    >
      {alwaysVisible.map((item, i) => (
        <div key={i}>{item}</div>
      ))}

      {isOverflowing ? (
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            style={{
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            <FaEllipsisV />
          </button>
          {showMenu && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                zIndex: 999,
              }}
            >
              {maybeOverflow.map((item, i) => (
                <div key={i}>{item}</div>
              ))}
            </div>
          )}
        </div>
      ) : (
        maybeOverflow.map((item, i) => <div key={i}>{item}</div>)
      )}
    </div>
  );
};
export default Toolbar;
