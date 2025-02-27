import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <h1>Welcome to AutoFixIDE</h1>
        <p>An advanced online IDE with AI-powered code fixing.</p>
        <Link href="/editor"><a>Go to Editor</a></Link>
      </main>
    </div>
  );
  }
