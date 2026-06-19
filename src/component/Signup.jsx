// import React, { useState } from "react";
// import API from "../component/API";
// // import "../styles/auth.css";
// import { Link } from "react-router-dom";
// const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
// const Signup = () => {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post(`${BASE_URL}/auth/signup`, form);
//       setMessage(res.data.msg);
//       setError("");
//       setForm({ name: "", email: "", password: "" });
//     } catch (err) {
//       setError(err.response?.data?.msg || "Error during signup");
//       setMessage("");
//     }
//   };

//   return (
//     <div className="singup-mainbody" style={{ background: "linear-gradient(135deg, #2563eb, #1e3a8a)" }}>

   
//     <div className="auth-container">
//       <h2>Signup</h2>
//       {error && <div className="error">{error}</div>}
//       {message && <div className="message">{message}</div>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Signup</button>
//       </form>
//       <p style={{ textAlign: "center", marginTop: "10px" }}>
//         Already have an account? <Link to="/login">Login</Link>
//       </p>
//     </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import API from "../component/API";
// import "../styles/auth.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //  THE FIX: Change from `${BASE_URL}/auth/signup` to just the relative endpoint path
      const res = await API.post("/auth/signup", form);
      
      setMessage(res.data.msg);
      setError("");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.msg || "Error during signup");
      setMessage("");
    }
  };

  return (
    <div className="singup-mainbody" style={{ background: "linear-gradient(135deg, #2563eb, #1e3a8a)" }}>
      <div className="auth-container">
        <h2>Signup</h2>
        {error && <div className="error">{error}</div>}
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
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
          <button type="submit">Signup</button>
        </form>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;