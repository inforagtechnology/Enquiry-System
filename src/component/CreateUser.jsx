import React, { useState } from "react";
import { createAdminOrHR } from "../component/API";

const CreateUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ["HR","admin"],
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(""); 

    try {
      const res = await createAdminOrHR(form);
      setMessage(res.data.msg);
      setForm({ name: "", email: "", password: "", role: "HR" });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Error creating user");
    }
  };

  return (
    <div className="create-user-container">
      <h2>Create HR/Admin</h2>
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}

      <form className="create-user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value="HR">HR</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
