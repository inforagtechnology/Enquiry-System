
// import React, { useState } from "react";
// import API from "../component/API"; // Axios instance
// import { Link, useNavigate } from "react-router-dom";

// const Login = ({ setUser }) => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // 1️⃣ Login request
//       const res = await API.post("/auth/login", form);

//       // Save token
//       localStorage.setItem("token", res.data.token);
//       setUser({ role: res.data.role, email: form.email });

//       // 2️⃣ Fetch user-specific data after login
//       const userDataRes = await API.get("/dashboard/mydata", {
//         headers: { Authorization: `Bearer ${res.data.token}` },
//       });

//       // Show alert with success message + data
//       alert(
//        " Login Successful!"
//       );

//       setError("");
//       navigate("/dashboard"); // redirect to dashboard
//     } catch (err) {
//       console.log(err.response);
//       setError(err.response?.data?.msg || "Error during login");
//     }
//   };
//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       {error && <div className="error">{error}</div>}
//       <form onSubmit={handleSubmit}>
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
//         <button type="submit">Login</button>
//       </form>

//       <div style={{ textAlign: "center", marginTop: "10px" }}>
//         <Link to="/forgot-password">Forgot Password?</Link>
//       </div>

//       <p style={{ textAlign: "center", marginTop: "10px" }}>
//         Don't have an account? <Link to="/signup">Signup</Link>
//       </p>
//     </div>
//   );
// };

// export default Login;





// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../component/API";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      alert("Login successful!");

      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "HR") navigate("/dashboard");
      else navigate("/dashboard");
    } catch (err) {
      alert("Login failed! Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        

        <button type="submit">Login</button>
     <div className="forgot-row">
          <Link to="/forgot-password" className="forgot-link">
            Forgot Password?
          </Link>
        </div>
        <p className="signup-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
