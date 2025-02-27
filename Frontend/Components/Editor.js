// Optional: If you want a dedicated Editor component wrapping Monaco.
import dynamic from "next/dynamic";
const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });
export default function Editor({ code, setCode }) {
  return (
    <MonacoEditor
      width="100%"
      height="500px"
      language="python"
      theme="vs-dark"
      value={code}
      onChange={setCode}
      options={{ automaticLayout: true }}
    />
  );
}
