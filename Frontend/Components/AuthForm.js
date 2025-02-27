import { useState } from "react";
import axios from "axios";

export default function AuthForm() {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "signup") {
      try {
        await axios.post("/api/auth/signup", { email, username, password });
        alert("Signup successful! Now log in.");
        setMode("login");
      } catch (err) {
        alert("Signup failed: " + err.response.data.detail);
      }
    } else {
      try {
        const res = await axios.post(
          "/api/auth/login",
          new URLSearchParams({ username, password }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        setToken(res.data.access_token);
        alert("Login successful!");
      } catch (err) {
        alert("Login failed: " + err.response.data.detail);
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", marginBottom: "1rem" }}
            />
          </>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />
        <button type="submit" style={{ width: "100%" }}>
          {mode === "signup" ? "Sign Up" : "Login"}
        </button>
      </form>
      <button
        onClick={() => setMode(mode === "signup" ? "login" : "signup")}
        style={{ marginTop: "1rem" }}
      >
        Switch to {mode === "signup" ? "Login" : "Sign Up"}
      </button>
      {token && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Your Token:</h4>
          <p>{token}</p>
        </div>
      )}
    </div>
  );
                }
