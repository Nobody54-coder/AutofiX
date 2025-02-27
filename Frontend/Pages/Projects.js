import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Projects() {
  // In a real app, fetch projects from backend
  const [projects] = useState([
    { id: 1, name: "Project Alpha" },
    { id: 2, name: "Project Beta" },
  ]);

  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <h1>My Projects</h1>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}
