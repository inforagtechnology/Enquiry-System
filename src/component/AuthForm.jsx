// import React, { useState } from "react";
// import axios from "axios";


// const AuthForm = () => {
//   const [isSignup, setIsSignup] = useState(true);
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [msg, setMsg] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = isSignup
//         ? "http://localhost:5000/auth/signup"
//         : "http://localhost:5000/auth/login";

//       const payload = isSignup
//         ? { name: form.name, email: form.email, password: form.password }
//         : { email: form.email, password: form.password };

//       const res = await axios.post(url, payload);
//       setMsg(res.data.msg);
//       // Clear form fields after successful submit
//     setForm({ name: "", email: "", password: "" });
//     } catch (err) {
//       setMsg(err.response?.data?.msg || "Error occurred");
//     }
//   };

//   return (
//     <div className="auth_main">
//       <div className="form-container">
//         <h2>{isSignup ? "Signup" : "Login"}</h2>
//         <form onSubmit={handleSubmit}>
//           {isSignup && (
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={form.name}
//               onChange={handleChange}
//               required
//             />
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit">{isSignup ? "Signup" : "Login"}</button>
//         </form>
//         {msg && <p className="message">{msg}</p>}

//         <div className="toggle-option">
//           {isSignup ? (
//             <p>
//               Already have an account?{" "}
//               <span onClick={() => setIsSignup(false)}>Login here</span>
//             </p>
//           ) : (
//             <p>
//               Don’t have an account?{" "}
//               <span onClick={() => setIsSignup(true)}>Signup here</span>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;




import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignup
        ? "http://localhost:5000/auth/signup"
        : "http://localhost:5000/auth/login"; 

      const payload = isSignup
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const res = await axios.post(url, payload);
      setMsg(res.data.msg);
      setForm({ name: "", email: "", password: "" }); // Clear fields
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error occurred");
    }
  };

  return (
    <div className="auth_main">
      <div className="form-container">
        <h2>{isSignup ? "Signup" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
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
          <button type="submit">{isSignup ? "Signup" : "Login"}</button>
        </form>
        {msg && <p className="message">{msg}</p>}

        <div className="toggle-option">
          {isSignup ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setIsSignup(false)}>Login here</span>
            </p>
          ) : (
            <>
              <p>
                Don’t have an account?{" "}
                <span onClick={() => setIsSignup(true)}>Signup here</span>
              </p>
              <p style={{ marginTop: "10px" }}>
                <Link to="/forgot-password">Forgot Password?</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

