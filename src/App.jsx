import { useState } from "react";
import TextEditor from "./components/TextEditor";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {" "}
      <div>
        <h1 style={{ textAlign: "center" }}>📝 My Text Editor</h1>
        <TextEditor />
      </div>
    </>
  );
}

export default App;
