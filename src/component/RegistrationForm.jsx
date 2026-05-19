// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const RegistrationForm = () => {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         course: "",
//         mobile: "",
//         marks:"50 out of 100",
//         registrationFees: "500",
//         paymentMethod: "cash",
//         transactionId: "",
//         examDate: "",
//     });

//     const [loading, setLoading] = useState(false);

//     const courses = [
//         "Web Development",
//         "Mongoose db",
//         "Mern-stack",
//         "Full-Stack",
//         "Video Editing",
//         "Digital Marketing",
//         "Node.js",
//         "Frontend development",
//         "Backend Development",
//         "AI",
//         "C & C++",
//         "SQL",
//     ];

//     // Handle input changes
//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     // Ensure only Friday dates
//     const handleExamDate = (e) => {
//         const selectedDate = new Date(e.target.value);
//         if (selectedDate.getDay() !== 5) {
//             toast.warning("Please select a Friday for the exam date.");
//             setForm({ ...form, examDate: "" });
//         } else {
//             setForm({ ...form, examDate: e.target.value });
//         }
//     };

//     // Submit form to backend
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const response = await axios.post(
//                 "http://localhost:5000/codeofschool/register",
//                 form
//             );

//             toast.success(response.data.message);

//             // Reset form
//             setForm({
//                 name: "",
//                 email: "",
//                 course: "",
//                 mobile: "",
//                 marks: "",
//                 registrationFees: "500",
//                 paymentMethod: "cash",
//                 transactionId: "",
//                 examDate: "",
//             });
//         } catch (error) {
//             toast.error(error.response?.data?.message );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="registration_form">
//             <h2 className="form_heading">Registration Form</h2>

//             <form onSubmit={handleSubmit} className="form-data">
//                 <label>Full Name</label>
//                 <input
//                     type="text"
//                     name="name"
//                     value={form.name}
//                     onChange={handleChange}
//                     required
//                 />

//                 <label>Email</label>
//                 <input
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     required
//                 />

//                 <label>Course</label>
//                 <select
//                     name="course"
//                     value={form.course}
//                     onChange={handleChange}
//                     required
//                 >
//                     <option value="">Select Course</option>
//                     {courses.map((c, i) => (
//                         <option key={i} value={c}>
//                             {c}
//                         </option>
//                     ))}
//                 </select>

//                 <label>Mobile Number</label>
//                 <input
//                     type="text"
//                     name="mobile"
//                     value={form.mobile}
//                     onChange={handleChange}
//                     required
//                 />
//                <label>Marks</label>
//                <input 
//                type="text"
//                name="marks"
//                value={form.marks}
//                onChange={handleChange}
//                disabled
//                />
//                 <label>Registration Fees</label>
//                 <input
//                     type="text"
//                     name="registrationFees"
//                     value={`₹${form.registrationFees}`}
//                     disabled
//                 />

//                 <label>Payment Method</label>
//                 <select
//                     name="paymentMethod"
//                     value={form.paymentMethod}
//                     onChange={handleChange}
//                 >
//                     <option value="cash">Cash</option>
//                     <option value="online">Online</option>
//                 </select>

//                 {form.paymentMethod === "online" && (
//                     <>
//                         <label>Transaction ID</label>
//                         <input
//                             type="text"
//                             name="transactionId"
//                             value={form.transactionId}
//                             onChange={handleChange}
//                             required
//                         />
//                     </>
//                 )}

//                 <label className="exam-date">Exam Date</label>
//                 <input
//                     type="date"
//                     name="examDate"
//                     value={form.examDate}
//                     onChange={handleExamDate}
//                     required
//                 />

//                 <button type="submit" disabled={loading}>
//                     {loading ? "Submitting..." : "Submit"}
//                 </button>
//             </form>

//             {/* Toast Container */}
//             <ToastContainer position="top-center" autoClose={3000} />
//         </div>
//     );
// };

// export default RegistrationForm;



import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./RegistrationForm.css";
import sideImage from "./images/registerside.jpg";

const RegistrationForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    mobile: "",
    marks: "50 out of 100",
    registrationFees: "500",
    paymentMethod: "cash",
    transactionId: "",
    examDate: "",
  });

  const [loading, setLoading] = useState(false);

  const courses = [
    "Web Development",
    "Mongoose db",
    "Mern-stack",
    "Full-Stack",
    "Video Editing",
    "Digital Marketing",
    "Node.js",
    "Frontend development",
    "Backend Development",
    "AI",
    "C & C++",
    "SQL",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const  handleExamDate = (e) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate.getDay() !== 5) {
      toast.warning("Please select a Friday for the exam date.");
      setForm({ ...form, examDate: "" });
    } else {
      setForm({ ...form, examDate: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/codeofschool/register",
        form
      );
      toast.success(response.data.message);

      setForm({
        name: "",
        email: "",
        course: "",
        mobile: "",
        marks: "",
        registrationFees: "500",
        paymentMethod: "cash",
        transactionId: "",
        examDate: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-body">
    <div className="registration-container">
      {/* Left side image */}
      <div className="form-image">
        <img src={sideImage} alt="Register" />
      </div>

      {/* Right side form */}
      <div className="form-section">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit} className="form-data">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Course</label>
              <select
                name="course"
                value={form.course}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>
                {courses.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Mobile</label>
              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Marks</label>
              <input type="text" name="marks" value={form.marks} disabled />
            </div>

            <div className="form-group">
              <label>Registration Fees</label>
              <input type="text" value={`₹${form.registrationFees}`} disabled />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Payment Method</label>
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
              >
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </select>
            </div>

            {form.paymentMethod === "online" && (
              <div className="form-group">
                <label>Transaction ID</label>
                <input
                  type="text"
                  name="transactionId"
                  value={form.transactionId}
                  onChange={handleChange}
                  required
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Exam Date</label>
            <input
              type="date"
              name="examDate"
              value={form.examDate}
              onChange={handleExamDate}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
    </div>
  );
};

export default RegistrationForm;

