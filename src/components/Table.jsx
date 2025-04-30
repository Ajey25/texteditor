import React, { useState, useRef, useEffect } from "react";
import { LiaTableSolid } from "react-icons/lia";
const TableInsert = ({ editorRef }) => {
  const [showGrid, setShowGrid] = useState(false);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const gridRef = useRef(null);

  const maxRows = 8;
  const maxCols = 8;

  const insertTable = () => {
    if (rows < 1 || cols < 1) return;

    const table = document.createElement("table");
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.style.marginTop = "10px";

    for (let i = 0; i < rows; i++) {
      const row = table.insertRow();
      for (let j = 0; j < cols; j++) {
        const cell = row.insertCell();
        cell.innerHTML = "&nbsp;";
        cell.style.border = "1px solid black";
        cell.style.padding = "8px";
      }
    }

    if (editorRef.current) {
      editorRef.current.focus();
      const selection = window.getSelection();
      if (!selection.rangeCount) return;
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(table);
    }

    setShowGrid(false);
    setRows(0);
    setCols(0);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (gridRef.current && !gridRef.current.contains(e.target)) {
        setShowGrid(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative" }} ref={gridRef}>
      <button onClick={() => setShowGrid((prev) => !prev)} title="Insert Table">
        <LiaTableSolid size={25} style={{ marginTop: "3px" }} />{" "}
      </button>

      {showGrid && (
        <div
          style={{
            position: "absolute",
            top: "120%",
            left: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "4px",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 999,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${maxCols}, 10px)`,
              gap: "2px",
            }}
          >
            {[...Array(maxRows * maxCols)].map((_, idx) => {
              const row = Math.floor(idx / maxCols) + 1;
              const col = (idx % maxCols) + 1;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => {
                    setRows(row);
                    setCols(col);
                  }}
                  onClick={insertTable}
                  style={{
                    width: "10px",
                    height: "10px",
                    backgroundColor:
                      row <= rows && col <= cols ? "#4caf50" : "#e0e0e0",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
          <div
            style={{ marginTop: "6px", fontSize: "14px", textAlign: "center" }}
          >
            {rows} × {cols} table
          </div>
        </div>
      )}
    </div>
  );
};

export default TableInsert;
