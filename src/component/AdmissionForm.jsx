// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// export const AdmissionForm = () => {
//   const location = useLocation();
//   const prefillData = location.state?.formData; // ✅ safe access

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     course: "",
//     mobile: "",
//     examDate: "",
//     installment1: {
//       paymentMode: "",
//       transactionId: "",
//     },
//     installment2: {
//       paymentMode: "",
//       transactionId: "",
//     },
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // ✅ Prefill data
//   useEffect(() => {
//     if (prefillData) {
//       setForm((prev) => ({
//         ...prev,
//         name: prefillData.name || "",
//         email: prefillData.email || "",
//         course: prefillData.course || "",
//         mobile: prefillData.mobile || "",
//         examDate: prefillData.examDate
//           ? prefillData.examDate.split("T")[0]
//           : "",
//       }));
//     }
//   }, [prefillData]);

//   // ✅ handle change for normal fields
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // ✅ handle change for installment fields
//   const handleInstallmentChange = (e, installmentKey) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [installmentKey]: {
//         ...prev[installmentKey],
//         [name]: value,
//       },
//     }));
//   };

//   // ✅ submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const payload = {
//         fullName: form.name,
//         email: form.email,
//         mobile: form.mobile,
//         course: form.course,
//         examDate: form.examDate,
//         payment: {
//           firstInstallment: {
//             mode: form.installment1.paymentMode,
//             transactionId: form.installment1.transactionId || undefined,
//           },
//           secondInstallment: {
//             mode: form.installment2.paymentMode,
//             transactionId: form.installment2.transactionId || undefined,
//           },
//         },
//       };

//       const res = await axios.post(
//         "http://localhost:5000/Admission/admission_create",
//         payload
//       );

//       alert(res.data.message || "Admission created successfully");

//       // ✅ Reset form
//       setForm({
//         name: "",
//         email: "",
//         course: "",
//         mobile: "",
//         examDate: "",
//         installment1: { paymentMode: "", transactionId: "" },
//         installment2: { paymentMode: "", transactionId: "" },
//       });
//     } catch (error) {
//       alert(error.response?.data?.message || "Error submitting admission");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Admission Form</h2>

//       {message && <p>{message}</p>}

//       <form onSubmit={handleSubmit} className="admission-form">
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
//         <input
//           type="text"
//           name="course"
//           value={form.course}
//           onChange={handleChange}
//           placeholder="Course"
//           required
//         />
//         <input
//           type="date"
//           name="examDate"
//           value={form.examDate}
//           onChange={handleChange}
//           required
//         />

//         {/* Installment 1 */}
//         <h3>Installment 1</h3>
//         <select
//           name="paymentMode"
//           value={form.installment1.paymentMode}
//           onChange={(e) => handleInstallmentChange(e, "installment1")}
//           required
//         >
//           <option value="">-- Select Payment Mode --</option>
//           <option value="cash">Cash</option>
//           <option value="online">Online</option>
//         </select>
//         {form.installment1.paymentMode === "online" && (
//           <input
//             type="text"
//             name="transactionId"
//             value={form.installment1.transactionId}
//             onChange={(e) => handleInstallmentChange(e, "installment1")}
//             placeholder="Transaction ID"
//             required
//           />
//         )}

//         {/* Installment 2 */}
//         <h3>Installment 2</h3>
//         <select
//           name="paymentMode"
//           value={form.installment2.paymentMode}
//           onChange={(e) => handleInstallmentChange(e, "installment2")}
//         >
//           <option value="">-- Select Payment Mode --</option>
//           <option value="cash">Cash</option>
//           <option value="online">Online</option>
//         </select>
//         {form.installment2.paymentMode === "online" && (
//           <input
//             type="text"
//             name="transactionId"
//             value={form.installment2.transactionId}
//             onChange={(e) => handleInstallmentChange(e, "installment2")}
//             placeholder="Transaction ID"
//           />
//         )}

//         <button type="submit" className="btn submit" disabled={loading}>
//           {loading ? "Submitting..." : "Submit Admission"}
//         </button>
//       </form>
//     </div>
//   );
// };


// import React, { useState } from "react";
// import axios from "axios";


//  export const AdmissionForm = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     course: "",
//     mobile: "",
//     examDate: "",
//     installment1: { paymentMode: "", transactionId: "" },
//     installment2: { paymentMode: "", transactionId: "" },
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleInstallmentChange = (e, key) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [key]: { ...prev[key], [name]: value },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const payload = {
//         fullName: form.name,
//         email: form.email,
//         mobile: form.mobile,
//         course: form.course,
//         examDate: form.examDate,
//         payment: {
//           firstInstallment: form.installment1,
//           secondInstallment: form.installment2,
//         },
//       };

//       const res = await axios.post(
//         "http://localhost:5000/Admission/admission_create",
//         payload
//       );
//       alert(res.data.message || "Admission created successfully");

//       setForm({
//         name: "",
//         email: "",
//         course: "",
//         mobile: "",
//         examDate: "",
//         installment1: { paymentMode: "", transactionId: "" },
//         installment2: { paymentMode: "", transactionId: "" },
//       });
//     } catch (err) {
//       alert(err.response?.data?.message || "Error submitting admission");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="admission-wrapper">
//       <div className="admission-card">
//         <h2>Admission Form</h2>
//         <form onSubmit={handleSubmit} className="admission-form">
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//           />
//           <input
//             type="text"
//             name="mobile"
//             value={form.mobile}
//             onChange={handleChange}
//             placeholder="Mobile"
//             required
//           />
//           <input
//             type="text"
//             name="course"
//             value={form.course}
//             onChange={handleChange}
//             placeholder="Course"
//             required
//           />
//           {/* <input
//             type="date"
//             name="examDate"
//             value={form.examDate}
//             onChange={handleChange}
//             required
//           /> */}

//           <h3>Installment 1</h3>
//           <select
//             name="paymentMode"
//             value={form.installment1.paymentMode}
//             onChange={(e) => handleInstallmentChange(e, "installment1")}
//             required
//           >
//             <option value="">-- Select Payment Mode --</option>
//             <option value="cash">Cash</option>
//             <option value="online">Online</option>
//           </select>
//           {form.installment1.paymentMode === "online" && (
//             <input
//               type="text"
//               name="transactionId"
//               value={form.installment1.transactionId}
//               onChange={(e) => handleInstallmentChange(e, "installment1")}
//               placeholder="Transaction ID"
//               required
//             />
//           )}

//           <h3>Installment 2</h3>
//           <select
//             name="paymentMode"
//             value={form.installment2.paymentMode}
//             onChange={(e) => handleInstallmentChange(e, "installment2")}
//           >
//             <option value="">-- Select Payment Mode --</option>
//             <option value="cash">Cash</option>
//             <option value="online">Online</option>
//           </select>
//           {form.installment2.paymentMode === "online" && (
//             <input
//               type="text"
//               name="transactionId"
//               value={form.installment2.transactionId}
//               onChange={(e) => handleInstallmentChange(e, "installment2")}
//               placeholder="Transaction ID"
//             />
//           )}

//           <button type="submit" disabled={loading}>
//             {loading ? "Submitting..." : "Submit Admission"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdmissionForm



// import React, { useState } from "react";
// import axios from "axios";

// export const AdmissionForm = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     course: "",
//     mobile: "",
//     examDate: "",
//     installment1: { mode: "", transactionId: "" }, // use "mode"
//     installment2: { mode: "", transactionId: "" },
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleInstallmentChange = (e, key) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [key]: { ...prev[key], [name]: value },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const payload = {
//         fullName: form.name,
//         email: form.email,
//         mobile: form.mobile,
//         course: form.course,
//         examDate: form.examDate,
//         payment: {
//           firstInstallment: form.installment1,
//           secondInstallment: form.installment2,
//         },
//       };

//       const res = await axios.post(
//         "http://localhost:5000/Admission/admission_create",
//         payload
//       );
//       alert(res.data.message || "Admission created successfully ✅");

//       setForm({
//         name: "",
//         email: "",
//         course: "",
//         mobile: "",
//         examDate: "",
//         installment1: { mode: "", transactionId: "" },
//         installment2: { mode: "", transactionId: "" },
//       });
//     } catch (err) {
//       alert(err.response?.data?.message || "Error submitting admission ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="admission-wrapper">
//       <div className="admission-card">
//         <h2>Admission Form</h2>
//         <form onSubmit={handleSubmit} className="admission-form">
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Full Name"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//           />
//           <input
//             type="text"
//             name="mobile"
//             value={form.mobile}
//             onChange={handleChange}
//             placeholder="Mobile"
//             required
//           />
//           <input
//             type="text"
//             name="course"
//             value={form.course}
//             onChange={handleChange}
//             placeholder="Course"
//             required
//           />

//           <h3>Installment 1</h3>
//           <select
//             name="mode" // matches schema
//             value={form.installment1.mode}
//             onChange={(e) => handleInstallmentChange(e, "installment1")}
//             required
//           >
//             <option value="">-- Select Payment Mode --</option>
//             <option value="cash">Cash</option>
//             <option value="online">Online</option>
//           </select>
//           {form.installment1.mode === "online" && (
//             <input
//               type="text"
//               name="transactionId"
//               value={form.installment1.transactionId}
//               onChange={(e) => handleInstallmentChange(e, "installment1")}
//               placeholder="Transaction ID"
//               required
//             />
//           )}

//           <h3>Installment 2</h3>
//           <select
//             name="mode" // matches schema
//             value={form.installment2.mode}
//             onChange={(e) => handleInstallmentChange(e, "installment2")}
//           >
//             <option value="">-- Select Payment Mode --</option>
//             <option value="cash">Cash</option>
//             <option value="online">Online</option>
//           </select>
//           {form.installment2.mode === "online" && (
//             <input
//               type="text"
//               name="transactionId"
//               value={form.installment2.transactionId}
//               onChange={(e) => handleInstallmentChange(e, "installment2")}
//               placeholder="Transaction ID"
//             />
//           )}

//           <button type="submit" disabled={loading}>
//             {loading ? "Submitting..." : "Submit Admission"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdmissionForm;


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URl|| "http://localhost:5000"

export const AdmissionForm = () => {
  const location = useLocation();
  const prefillData = location.state?.formData; // ✅ data from Home

  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    mobile: "",
    examDate: "",
    installment1: { mode: "", transactionId: "" },
    installment2: { mode: "", transactionId: "" },
  });

  const [loading, setLoading] = useState(false);

  // Prefill form when data comes from Home
  useEffect(() => {
    if (prefillData) {
      setForm((prev) => ({
        ...prev,
        name: prefillData.name || "",
        email: prefillData.email || "",
        course: prefillData.course || "",
        mobile: prefillData.mobile || "",
      }));
    }
  }, [prefillData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInstallmentChange = (e, key) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [key]: { ...prev[key], [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        fullName: form.name,
        email: form.email,
        mobile: form.mobile,
        course: form.course,
        examDate: form.examDate,
        payment: {
          firstInstallment: form.installment1,
          secondInstallment: form.installment2,
        },
      };

      const res = await axios.post(
        `${BASE_URL}/Admission/admission_create`,
        payload
      );
      alert(res.data.message || "Admission created successfully");

      setForm({
        name: "",
        email: "",
        course: "",
        mobile: "",
        examDate: "",
        installment1: { mode: "", transactionId: "" },
        installment2: { mode: "", transactionId: "" },
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting admission ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admission-wrapper">
      <div className="admission-card">
        <h2>Admission Form</h2>
        <form onSubmit={handleSubmit} className="admission-form">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            required
          />
          <input
            type="text"
            name="course"
            value={form.course}
            onChange={handleChange}
            placeholder="Course"
            required
          />

          <h3>Installment 1</h3>
          <select
            name="mode"
            value={form.installment1.mode}
            onChange={(e) => handleInstallmentChange(e, "installment1")}
            required
          >
            <option value="">-- Select Payment Mode --</option>
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>
          {form.installment1.mode === "online" && (
            <input
              type="text"
              name="transactionId"
              value={form.installment1.transactionId}
              onChange={(e) => handleInstallmentChange(e, "installment1")}
              placeholder="Transaction ID"
              required
            />
          )}

          <h3>Installment 2</h3>
          <select
            name="mode"
            value={form.installment2.mode}
            onChange={(e) => handleInstallmentChange(e, "installment2")}
          >
            <option value="">-- Select Payment Mode --</option>
            <option value="cash">Cash</option>
            <option value="online">Online</option>
          </select>
          {form.installment2.mode === "online" && (
            <input
              type="text"
              name="transactionId"
              value={form.installment2.transactionId}
              onChange={(e) => handleInstallmentChange(e, "installment2")}
              placeholder="Transaction ID"
            />
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Admission"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
