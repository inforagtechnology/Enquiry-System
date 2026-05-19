import React, { useState } from "react";
import axios from "axios";

const EnquiryForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    mobile: "",
    registrationFees: "", // <-- Added field
    Enquiry_Message: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const courses = [
    "Web Development",
    "Mongoose DB",
    "MERN Stack",
    "Full Stack",
    "Video Editing",
    "Digital Marketing",
    "Node.js",
    "Frontend Development",
    "Backend Development",
    "AI",
    "C & C++",
    "SQL",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/enquiry/Create_enquiry", form);
      alert(res.data.message);
      setForm({
        name: "",
        email: "",
        course: "",
        mobile: "",
        registrationFees: "",
        Enquiry_Message: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="enquiry-container">
      <h2 className="form-title">Enquiry Form</h2>
      <form className="enquiry-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <select name="course" value={form.course} onChange={handleChange} required>
          <option value="">Select Course</option>
          {courses.map((course, i) => (
            <option key={i} value={course}>
              {course}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="mobile"
          placeholder="Enter your 10-digit mobile number"
          value={form.mobile}
          onChange={handleChange}
          required
        />

        {/* ✅ Registration Fees Radio Buttons */}
        <div className="radio-group">
          <label>Registration Fees:</label>
          <div className="radio-options">
            <label>
              <input
                type="radio"
                name="registrationFees"
                value="Yes"
                checked={form.registrationFees === "Yes"}
                onChange={handleChange}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="registrationFees"
                value="No"
                checked={form.registrationFees === "No"}
                onChange={handleChange}
                required
              />
              No
            </label>
          </div>
        </div>

        <textarea
          name="Enquiry_Message"
          placeholder="Write your enquiry..."
          spellCheck="true"
          value={form.Enquiry_Message}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default EnquiryForm;
