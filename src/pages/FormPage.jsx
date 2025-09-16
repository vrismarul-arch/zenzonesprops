// pages/FormPage.jsx

import { useState } from "react";
import { api } from "../api/api";

export default function FormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dateTime: "",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/entries/add", formData);
      alert(response.data.message);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        dateTime: "",
      });
    } catch (error) {
      console.error("Error submitting entry:", error);
      alert("Failed to submit entry");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center" }}>Entry Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label><br />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Phone Number:</label><br />
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Date & Time:</label><br />
          <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} required style={{ width: "100%", padding: "8px" }} />
        </div>

        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "4px" }}>
          Submit
        </button>
      </form>
    </div>
  );
}
