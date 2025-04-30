import React, { useState, useRef, useEffect } from "react";
import { FaLink } from "react-icons/fa";

const Link = ({ editorRef }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [url, setUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const savedSelectionRef = useRef(null);
  const popupRef = useRef(null);
  const inputRef = useRef(null);

  const enhanceLink = (linkNode, url) => {
    linkNode.setAttribute("href", url);
    linkNode.setAttribute("target", "_blank");
    linkNode.setAttribute("rel", "noopener noreferrer");
    linkNode.style.color = "#0078d4";
    linkNode.style.textDecoration = "underline";
    linkNode.style.cursor = "pointer";

    linkNode.addEventListener("click", (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (showPopup && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopup]);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      savedSelectionRef.current = range.cloneRange();
      setLinkText(range.toString());
    }
  };

  const restoreSelection = () => {
    if (savedSelectionRef.current) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedSelectionRef.current);
    }
  };

  const handleAddLink = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setLinkText("");
    } else {
      saveSelection();
    }
    setShowPopup(true);
  };

  const applyLink = () => {
    if (!url.trim()) {
      alert("Please enter a URL");
      return;
    }

    setShowPopup(false);

    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = "https://" + finalUrl;
    }

    editorRef.current.focus();

    if (savedSelectionRef.current) {
      restoreSelection();
      document.execCommand("createLink", false, finalUrl);

      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const linkNode = range.commonAncestorContainer.parentNode;
        if (linkNode.tagName === "A") {
          enhanceLink(linkNode, finalUrl);
        }
      }
    } else {
      const newLink = document.createElement("a");
      newLink.href = finalUrl;
      newLink.textContent = linkText || finalUrl;
      enhanceLink(newLink, finalUrl);

      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.insertNode(newLink);
        range.setStartAfter(newLink);
        range.setEndAfter(newLink);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        editorRef.current.appendChild(newLink);
      }
    }

    setUrl("");
    setLinkText("");
  };

  return (
    <div style={{ position: "relative" }} ref={popupRef}>
      <button onClick={handleAddLink} title="Insert Link">
        <FaLink style={{ marginTop: "4px" }} />
      </button>

      {showPopup && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            left: -120,
            backgroundColor: "#eee",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 999,
            minWidth: "250px",
          }}
        >
          {linkText && (
            <div style={{ marginBottom: "6px" }}>
              <label style={{ fontSize: "12px" }}>Text</label>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="w-full"
                style={{
                  width: "90%",
                  padding: "4px",
                  fontSize: "14px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginTop: "2px",
                }}
              />
            </div>
          )}
          <div style={{ marginBottom: "6px" }}>
            <label style={{ fontSize: "12px" }}>URL</label>
            <input
              ref={inputRef}
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyLink();
                } else if (e.key === "Escape") {
                  setShowPopup(false);
                }
              }}
              style={{
                width: "90%",
                padding: "4px",
                fontSize: "14px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "2px",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "6px",
              marginTop: "8px",
            }}
          >
            <button
              onClick={() => setShowPopup(false)}
              style={{
                padding: "4px 8px",
                fontSize: "13px",
                backgroundColor: "#e0e0e0",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={applyLink}
              style={{
                padding: "4px 8px",
                fontSize: "13px",
                backgroundColor: "#0078d4",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Link;
