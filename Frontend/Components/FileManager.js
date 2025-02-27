import { useState } from "react";
import axios from "axios";

export default function FileManager() {
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadStatus(`Uploaded: ${res.data.filename}`);
    } catch (error) {
      setUploadStatus("Upload failed.");
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <h3>File Manager</h3>
      <input type="file" onChange={handleFileUpload} />
      <p>{uploadStatus}</p>
    </div>
  );
  }
