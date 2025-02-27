export default function Debugger({ output }) {
  return (
    <div style={styles.container}>
      <h3>Debug Output</h3>
      <pre style={styles.pre}>{output}</pre>
    </div>
  );
}

const styles = {
  container: {
    background: "#1e1e1e",
    color: "#fff",
    padding: "1rem",
    marginTop: "1rem",
    borderRadius: "4px",
  },
  pre: {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
};
