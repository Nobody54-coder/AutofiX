import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Debugger from "../components/Debugger";

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

export default function EditorPage() {
  const [code, setCode] = useState("# Write your Python code here\nprint('Hello, AutoFixIDE!')");
  const [output, setOutput] = useState("");
  
  const runCode = async () => {
    try {
      const res = await axios.post("/api/ide/run", { code });
      setOutput(res.data.output);
    } catch (err) {
      setOutput("Error running code: " + err.message);
    }
  };

  const fixCode = async () => {
    try {
      const res = await axios.post("/api/ai/fix", { code });
      setCode(res.data.fixed_code);
    } catch (err) {
      setOutput("Error fixing code: " + err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "1rem" }}>
          <h1>Code Editor</h1>
          <MonacoEditor
            width="100%"
            height="500px"
            language="python"
            theme="vs-dark"
            value={code}
            onChange={(newValue) => setCode(newValue)}
            options={{ automaticLayout: true }}
          />
          <div style={{ marginTop: "1rem" }}>
            <button onClick={runCode} style={{ marginRight: "1rem" }}>Run Code</button>
            <button onClick={fixCode}>Fix My Code</button>
          </div>
          <Debugger output={output} />
        </div>
      </div>
    </div>
  );
    }
