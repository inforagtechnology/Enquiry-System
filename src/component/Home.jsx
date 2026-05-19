// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';
// // import Navbar from './Navbar'

// export const Home = () => {
//   const [mobile, setMobile] = useState("");
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   // use uselocation for navigate data
//   const location = useLocation();


//   useEffect(() => {
//     if (location.state?.updatedMobile) {
//       setMobile(location.state.updatedMobile);
//       fetchData(location.state.updatedMobile);
//     }
//   }, [location.state]);

//   // Search API Call
//   const fetchData = async (mobileNumber) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/codeofschool/search/${mobileNumber}`
//       );
//       setData(res.data.data);
//       setError("");
//     } catch (err) {
//       setData(null);
//       setError("No record found with this mobile number");
//     }
//   };

//   // Manual Search Button
//   const handleSearch = () => {
//     if (!mobile) {
//       setError("Please enter mobile number");
//       return;
//     }
//     fetchData(mobile);
//     setMobile(""); // clear input after search
//   };
//   // Edit register form
//   // const handleEdit = (id) => {
//   //   confirm("Are you sure you want to edit your")
//   //   navigate(`/editregistration/${id}`);
//   // };
//   const handleEdit = (id) => {
//     const ok = window.confirm("Are you sure you want to edit this?");
//     if (ok) {
//       navigate(`/editregistration/${id}`);
//     }
//   };
//   // admission 
//   const handleAdmission = () => {
//     // navigate('/admission_form', { state: data });
//     const ok = window.confirm("Are you sure you want to take admission");
//     if (ok) {
//       navigate("/form_selector", { state: { formType: "admission", formData: data } });
//     }
//   };
//   // delete user 
//   // const handleDelete = async (id) => {
//   //   try {
//   //     await axios.delete(
//   //       `http://localhost:5000/codeofschool/delete_user/${id}`
//   //     );
//   //     alert("Deleted Successfully");
//   //     setData(null);
//   //   } catch (error) {
//   //     alert("Error while deleting");
//   //   }
//   // };
//   const handleDelete = async (id) => {
//     const ok = window.confirm("Are you sure you want to delete this record?");
//     if (!ok) return;
//     try {
//       await axios.delete(
//         `http://localhost:5000/codeofschool/delete_user/${id}`
//       );
//       alert("Deleted Successfully");
//       setData(null);
//     } catch (error) {
//       alert("Error while deleting");
//     }
//   };

//   return (
//     <div className='home_header'>
//       <div className="search-container">
//         {/* <h2>Search Registration</h2> */}
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Enter Mobile Number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//           <button className='btn' onClick={handleSearch}>Search</button>
//         </div>

//         {error && <p className="error">{error}</p>}

//         {data && (
//           <div className="table-container">
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Course</th>
//                   <th>Mobile</th>
//                   <th>Payment</th>
//                   <th>Exam Date</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{data.name}</td>
//                   <td>{data.email}</td>
//                   <td>{data.course}</td>
//                   <td>{data.mobile}</td>
//                   <td>{data.paymentMethod}</td>
//                   <td>{new Date(data.examDate).toLocaleDateString()}</td>
//                   <td>
//                     <button
//                       className="btn edit"
//                       onClick={() => handleEdit(data._id)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn delete"
//                       onClick={() => handleDelete(data._id)}
//                     >
//                       Delete
//                     </button>
//                     {/* <button className="btn admission" onClick={handleAdmission}>Admission</button> */}
//                     {/* {data && (
//   <button
//     className="btn admission"
//     onClick={handleAdmission}
//     disabled={data.isAdmitted}  // ✅ disable if already admitted
//   >
//     {data.isAdmitted ? "Already Admitted" : "Admission"}
//   </button>
// )} */}
//                     {!data.isAdmitted && (
//                       <button className="btn admission" onClick={handleAdmission}>
//                         Admission
//                       </button>
//                     )}

//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );

// }




import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export const Home = () => {
  const [mobile, setMobile] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token"); // 🔑 fetch token from localStorage

  useEffect(() => {
    if (location.state?.updatedMobile) {
      setMobile(location.state.updatedMobile);
      fetchData(location.state.updatedMobile);
    }
  }, [location.state]);

  // Search API Call with token
  const fetchData = async (mobileNumber) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/codeofschool/search/${mobileNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ attach token
          },
        }
      );
      setData(res.data.data);
      setError("");
    } catch (err) {
      setData(null);
      setError("No record found with this mobile number or Unauthorized");
    }
  };

  const handleSearch = () => {
    if (!mobile) {
      setError("Please enter mobile number");
      return;
    }
    fetchData(mobile);
    setMobile(""); // clear input after search
  };

  const handleEdit = (id) => {
    const ok = window.confirm("Are you sure you want to edit this?");
    if (ok) {
      navigate(`/editregistration/${id}`);
    }
  };

  const handleAdmission = () => {
    const ok = window.confirm("Are you sure you want to take admission");
    if (ok) {
      navigate("/form_selector", { state: { formType: "admission", formData: data } });
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this record?");
    if (!ok) return;
    try {
      await axios.delete(
        `http://localhost:5000/codeofschool/delete_user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // attach token for delete
          },
        }
      );
      alert("Deleted Successfully");
      setData(null);
    } catch (error) {
      alert("Error while deleting or Unauthorized");
    }
  };

  return (
    <div className='home_header'>
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button className='btn' onClick={handleSearch}>Search</button>
        </div>

        {error && <p className="error">{error}</p>}

        {data && (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Mobile</th>
                  <th>Payment</th>
                  <th>Exam Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.course}</td>
                  <td>{data.mobile}</td>
                  <td>{data.paymentMethod}</td>
                  <td>{new Date(data.examDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn edit"
                      onClick={() => handleEdit(data._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete"
                      onClick={() => handleDelete(data._id)}
                    >
                      Delete
                    </button>
                    {!data.isAdmitted && (
                      <button className="btn admission" onClick={handleAdmission}>
                        Admission
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
