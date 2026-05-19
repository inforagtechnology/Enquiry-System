import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/auth/reset-password/${token}`,
        { password }
      );
      setMsg(res.data.msg);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2 className="reset-title">Reset Password</h2>
        <form className="reset-form" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="reset-button">Reset Password</button>
        </form>
        {msg && <p className="reset-message">{msg}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
