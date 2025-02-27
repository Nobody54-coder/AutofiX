import { useState } from "react";
import Navbar from "../components/Navbar";
import AuthForm from "../components/AuthForm";

export default function AuthPage() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <h1>User Authentication</h1>
        <AuthForm />
      </main>
    </div>
  );
  }
