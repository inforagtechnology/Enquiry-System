// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams, } from "react-router-dom";
// import axios from "axios";

// const RegistrationEdit = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     course: "",
//     mobile: "",
//     registrationFees: "500",
//     paymentMethod: "",
//     transactionId: "",
//     examDate: "",
//   });
// // for courses selection
//   const courses = [
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

//   const [loading, setLoading] = useState(true);

//   // Fetch registration data by ID
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/codeofschool/get_user/${id}`
//         );
//         setForm(res.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
//         alert("Error fetching registration data");
//         setLoading(false);
//       }
//     };
//     if (id) fetchData();
//   }, [id]);
//   // Handle input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle update
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:5000/codeofschool/update_user/${id}`,
//         form
//       );
//       alert("Updated Successfully ");
//       navigate("/", { state: { updatedMobile: form.mobile } }); 
//     } catch (error) {
//       alert("Error while updating ");
//     }
//   };

//   if (loading) return <p>Loading...</p>;
  
//   return (
//     <div className="form-container">
//       <h2>Edit Registration</h2>
//       <form className="admission-form" onSubmit={handleUpdate}>
//         <input
//           type="text"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Name"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="text"
//           name="mobile" 
//           value={form.mobile}
//           onChange={handleChange}
//           placeholder="Mobile"
//           required
//         />
//         {/* <input
//           type="text"
//           name="course"
//           value={form.course}
//           onChange={handleChange}
//           placeholder="Course"
//           required
//         /> */}
//        <label>Course</label>
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



//          <input
//           type="number"
//           name="registrationFees"
//           value={form.registrationFees}
//           onChange={handleChange}
//           placeholder="Registration Fees"
//           disabled
//           required
//         />
//         <select
//           name="paymentMethod"
//           value={form.paymentMethod}
//           onChange={handleChange}
//           required
//         >
//           <option value="">-- Select Payment Method --</option>
//           <option value="cash">Cash</option>
//           <option value="online">Online</option>
//         </select>
//         {form.paymentMethod === "online" && (
//           <input
//             type="text"
//             name="transactionId"
//             value={form.transactionId}
//             onChange={handleChange}
//             placeholder="Transaction ID"
//             required
//           />
//         )}
//         <input
//           type="date"
//           name="examDate"
//           value={form.examDate?.split("T")[0]}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit" className="btn submit" >
//           Update
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationEdit;




import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import registerImg from "./images/registerside.jpg"; // apni image ka path daalein

const RegistrationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    mobile: "",
    registrationFees: "500",
    paymentMethod: "",
    transactionId: "",
    examDate: "",
  });

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

  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:5000/codeofschool/get_user/${id}`
  //       );
  //       setForm(res.data.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       alert("Error fetching registration data");
  //       setLoading(false);
  //     }
  //   };
  //   if (id) fetchData();
  // }, [id]);
  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); //  get token
      const res = await axios.get(
        `http://localhost:5000/codeofschool/get_user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // attach token
          },
        }
      );
      setForm(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Error fetching registration data or Unauthorized");
      setLoading(false);
    }
  };
  if (id) fetchData();
}, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.put(
  //       `http://localhost:5000/codeofschool/update_user/${id}`,
  //       form
  //     );
  //     alert("Updated Successfully ");
  //     navigate("/", { state: { updatedMobile: form.mobile } });
  //   } catch (error) {
  //     alert("Error while updating ");
  //   }
  // };
  const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token"); // 🔑 get token
    await axios.put(
      `http://localhost:5000/codeofschool/update_user/${id}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ attach token
        },
      }
    );
    alert("Updated Successfully ");
    navigate("/", { state: { updatedMobile: form.mobile } });
  } catch (error) {
    alert("Error while updating or Unauthorized");
  }
};


  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-wrapper">
      <div className="edit-card">
        {/* Left Side Image */}
        <div className="edit-left">
          <img src={registerImg} alt="Registration" />
        </div>

        {/* Right Side Form */}
        <div className="edit-right">
          <h2>Edit Registration</h2>
          <form onSubmit={handleUpdate} className="grid-form">
            {/* Name */}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter Name"
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Email"
                required
              />
            </div>

            {/* Mobile */}
            <div className="form-group">
              <label>Mobile</label>
              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Enter Mobile"
                required
              />
            </div>

            {/* Course */}
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

            {/* Registration Fees */}
            <div className="form-group">
              <label>Registration Fees</label>
              <input
                type="number"
                name="registrationFees"
                value={form.registrationFees}
                onChange={handleChange}
                disabled
              />
            </div>

            {/* Payment Method */}
            <div className="form-group">
              <label>Payment Method</label>
              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="">-- Select --</option>
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </select>
            </div>

            {/* Transaction ID (only if online) */}
            {form.paymentMethod === "online" && (
              <div className="form-group">
                <label>Transaction ID</label>
                <input
                  type="text"
                  name="transactionId"
                  value={form.transactionId}
                  onChange={handleChange}
                  placeholder="Enter Transaction ID"
                  required
                />
              </div>
            )}

            {/* Exam Date */}
            <div className="form-group">
              <label>Exam Date</label>
              <input
                type="date"
                name="examDate"
                value={form.examDate?.split("T")[0]}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit button full width */}
            <div className="form-group full-width">
              <button type="submit" className="btn submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationEdit;
  