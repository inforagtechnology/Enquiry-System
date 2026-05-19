import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/forgot-password", { email });
      setMsg(res.data.msg);
      setEmail(""); // clear field
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2 className="forgot-title">Forgot Password</h2>
        <form className="forgot-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="forgot-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="forgot-button">Send Reset Link</button>
        </form>
        {msg && <p className="forgot-message">{msg}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
