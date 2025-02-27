import axios from "axios";
import Navbar from "../components/Navbar";

export default function Deploy() {
  const triggerDeployment = async () => {
    try {
      const res = await axios.post("/api/deploy");
      alert(res.data.message);
    } catch (error) {
      alert("Deployment failed: " + error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <h1>Deploy AutoFixIDE</h1>
        <button onClick={triggerDeployment}>Trigger Deployment</button>
      </main>
    </div>
  );
}
