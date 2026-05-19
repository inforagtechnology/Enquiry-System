// import React, { useEffect, useState } from "react";
// import {
//   getUserData,
//   getHRData,
//   getAllData,
//   updateDataAPI,
//   deleteDataAPI,
// } from "../component/API";
// import CreateUser from "./CreateUser";
// import { MdDelete, MdModeEdit } from "react-icons/md";

// const Content = ({ activeTab, role }) => {
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editFormData, setEditFormData] = useState({});
//   const [editModule, setEditModule] = useState("");
//   const [editId, setEditId] = useState(null);

//   // Fields per module
//   const moduleFields = {
//     admission: [
//       "fullName",
//       "email",
//       "mobile",
//       "payment.firstInstallment.mode",
//       "payment.firstInstallment.transactionId",
//       "payment.secondInstallment.mode",
//       "payment.secondInstallment.transactionId",
//       "isAdmitted",
//     ],
//     registration: ["name", "email", "mobile", "registrationFees", "paymentMethod", "transactionId", "examDate"],
//     enquiry: ["name", "email", "mobile", "registrationFees", "Enquiry_Message"],
//   };

//   const fieldsToDisplay = moduleFields[activeTab] || [];

//   // Fetch Data
//   useEffect(() => {
//     if (activeTab === "create") return;

//     const fetchData = async () => {
//       try {
//         let res;
//         if (role === "HR") res = await getHRData();
//         else if (role === "admin" || role === "super-admin") res = await getAllData();
//         else res = await getUserData();
//         setData(res.data[activeTab] || []);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setData([]);
//       }
//     };

//     fetchData();
//   }, [activeTab, role]);

//   // Filter search
//   const filteredData = data.filter((item) =>
//     Object.values(item).some((v) =>
//       String(v).toLowerCase().includes(search.toLowerCase())
//     )
//   );

//   // Edit handlers
//   const handleEditClick = (item, module) => {
//     setEditFormData(item);
//     setEditModule(module);
//     setEditId(item._id);
//     setEditModalOpen(true);
//   };

//   const handleEditChange = (key, value) => {
//     if (key.includes(".")) {
//       const keys = key.split(".");
//       setEditFormData((prev) => {
//         let temp = { ...prev };
//         let ref = temp;
//         for (let i = 0; i < keys.length - 1; i++) {
//           if (!ref[keys[i]]) ref[keys[i]] = {};
//           ref = ref[keys[i]];
//         }
//         ref[keys[keys.length - 1]] = value;
//         return { ...temp };
//       });
//     } else {
//       setEditFormData((prev) => ({ ...prev, [key]: value }));
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateDataAPI(editModule, editId, editFormData);
//       alert("Record updated successfully");
//       setEditModalOpen(false);
//       setData((prev) =>
//         prev.map((item) =>
//           item._id === editId ? { ...item, ...editFormData } : item
//         )
//       );
//     } catch (err) {
//       console.error("Error updating record:", err);
//       alert("Error updating record");
//     }
//   };

//   const handleDelete = async (module, id) => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return;
//     try {
//       await deleteDataAPI(module, id);
//       alert("Record deleted successfully");
//       setData((prev) => prev.filter((item) => item._id !== id));
//     } catch (err) {
//       console.error("Error deleting record:", err);
//       alert("Error deleting record");
//     }
//   };

//   // Determine editable fields per role
//   const isFieldEditable = (key) => {
//     if (role === "HR" && activeTab === "admission") {
//       return key.startsWith("payment.secondInstallment");
//     }
//     if (role === "admin" || role === "super-admin") return true;
//     return false;
//   };

//   return (
//     <div className="content">
//       {activeTab !== "create" && (
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       )}

//       {activeTab === "create" ? (
//         <CreateUser />
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>S.No</th>
//               {fieldsToDisplay.map((key) => (
//                 <th key={key}>{key}</th>
//               ))}
//               <th>Created By</th>
//               <th>Updated By</th>
//               <th>Created At</th>
//               <th>Updated At</th>
//               {((role === "admin" || role === "super-admin") || (role === "HR" && activeTab === "admission")) && <th>Action</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length === 0 ? (
//               <tr>
//                 <td colSpan={fieldsToDisplay.length + 6 + (((role === "admin" || role === "super-admin") || (role === "HR" && activeTab === "admission")) ? 1 : 0)}>
//                   No records found
//                 </td>
//               </tr>
//             ) : (
//               filteredData.map((item, idx) => (
//                 <tr key={item._id}>
//                   <td>{idx + 1}</td>
//                   {fieldsToDisplay.map((key) => {
//                     const keys = key.split(".");
//                     let val = item;
//                     for (let k of keys) val = val?.[k];
//                     return <td key={key}>{val ?? "-"}</td>;
//                   })}
//                   <td>{item.createdBy ?? "-"}</td>
//                   <td>{item.updatedBy ?? "-"}</td>
//                   <td>{item.createdAt ? new Date(item.createdAt).toLocaleString() : "-"}</td>
//                   <td>{item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "-"}</td>
//                   {((role === "admin" || role === "super-admin") || (role === "HR" && activeTab === "admission")) && (
//                     <td>
//                       <button
//                         onClick={() => handleEditClick(item, activeTab)}
//                         style={{ color: "black", padding: "4px", marginBottom: "5px" }}
//                       >
//                         <MdModeEdit /> Edit
//                       </button>
//                       {(role === "admin" || role === "super-admin") && (
//                         <button onClick={() => handleDelete(activeTab, item._id)} style={{ color: "red" }}>
//                           <MdDelete /> Delete
//                         </button>
//                       )}
//                     </td>
//                   )}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}

//       {/* Edit Modal */}
//       {editModalOpen && (
//   <div
//     style={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       backgroundColor: "rgba(0,0,0,0.5)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 1000,
//       backdropFilter: "blur(3px)",
//     }}
//   >
//     <div
//       style={{
//         background: "#fff",
//         padding: "30px",
//         width: "500px",
//         borderRadius: "16px",
//         boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
//         animation: "fadeIn 0.3s ease",
//         maxHeight: "80vh",
//         overflowY: "auto",
//       }}
//     >
//       <h2
//         style={{
//           textAlign: "center",
//           color: "#ea121dff",
//           marginBottom: "20px",
//           fontSize: "22px",
//         }}
//       >
//         Edit {activeTab} Record
//       </h2>

//       <form onSubmit={handleEditSubmit}>
//         {fieldsToDisplay.map((key) => (
//           <div key={key} style={{ marginBottom: "15px" }}>
//             <label
//               style={{
//                 display: "block",
//                 fontWeight: "600",
//                 color: "#34495e",
//                 marginBottom: "6px",
//                 textTransform: "capitalize",
//               }}
//             >
//               {key.replace(/([A-Z])/g, " $1")}
//             </label>
//             <input
//               type="text"
//               value={
//                 key.includes(".")
//                   ? key.split(".").reduce((o, k) => o?.[k], editFormData) ?? ""
//                   : editFormData[key] ?? ""
//               }
//               onChange={(e) => handleEditChange(key, e.target.value)}
//               disabled={!isFieldEditable(key)}
//               style={{
//                 width: "100%",
//                 padding: "10px 12px",
//                 borderRadius: "8px",
//                 border: "1px solid #ccc",
//                 fontSize: "15px",
//                 outline: "none",
//                 transition: "0.3s",
//                 backgroundColor: !isFieldEditable(key)
//                   ? "#f5f5f5"
//                   : "white",
//               }}
//               onFocus={(e) =>
//                 (e.target.style.borderColor = "#4a90e2")
//               }
//               onBlur={(e) =>
//                 (e.target.style.borderColor = "#ccc")
//               }
//             />
//           </div>
//         ))}

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "flex-end",
//             gap: "10px",
//             marginTop: "25px",
//           }}
//         >
//           <button
//             type="button"
//             onClick={() => setEditModalOpen(false)}
//             style={{
//               padding: "10px 18px",
//               borderRadius: "8px",
//               border: "none",
//               background: "#e74c3c",
//               color: "#fff",
//               cursor: "pointer",
//               fontSize: "15px",
//               transition: "0.3s",
//             }}
//             onMouseOver={(e) =>
//               (e.target.style.background = "#c0392b")
//             }
//             onMouseOut={(e) =>
//               (e.target.style.background = "#e74c3c")
//             }
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             style={{
//               padding: "10px 18px",
//               borderRadius: "8px",
//               border: "none",
//               background: "#4a90e2",
//               color: "#fff",
//               cursor: "pointer",
//               fontSize: "15px",
//               transition: "0.3s",
//             }}
//             onMouseOver={(e) =>
//               (e.target.style.background = "#357ab7")
//             }
//             onMouseOut={(e) =>
//               (e.target.style.background = "#4a90e2")
//             }
//           >
//             Save Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default Content;





import React, { useEffect, useState } from "react";
import {
  getUserData,
  getHRData,
  getAllData,
  updateDataAPI,
  deleteDataAPI,
} from "../component/API";
import CreateUser from "./CreateUser";
import { MdDelete, MdModeEdit } from "react-icons/md";

const Content = ({ activeTab, role }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [editModule, setEditModule] = useState("");
  const [editId, setEditId] = useState(null);
  /* ================= PAGINATION STATE ================= */
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  // Fields per module
  const moduleFields = {
    admission: [
      "fullName",
      "email",
      "mobile",
      "payment.firstInstallment.mode",
      "payment.firstInstallment.transactionId",
      "payment.secondInstallment.mode",
      "payment.secondInstallment.transactionId",
      "isAdmitted",
    ],
    registration: ["name", "email", "mobile", "registrationFees", "paymentMethod", "transactionId", "examDate"],
    enquiry: ["name", "email", "mobile", "registrationFees", "Enquiry_Message"],
  };

  const fieldsToDisplay = moduleFields[activeTab] || [];

  // Fetch Data
  useEffect(() => {
    if (activeTab === "create") return;

    const fetchData = async () => {
      try {
        let res;
        if (role === "HR") res = await getHRData();
        else if (role === "admin" || role === "super-admin") res = await getAllData();
        else res = await getUserData();
        setData(res.data[activeTab] || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setData([]);
      }
    };

    fetchData();
  }, [activeTab, role]);

  // Filter search
  // const filteredData = data.filter((item) =>
  //   Object.values(item).some((v) =>
  //     String(v).toLowerCase().includes(search.toLowerCase())
  //   )
  // );


  const deepSearch = (obj, term) => {
    return Object.values(obj).some((value) => {
      if (value === null || value === undefined) return false;

      if (typeof value === "object") {
        return deepSearch(value, term);
      }

      return String(value).toLowerCase().includes(term.toLowerCase());
    });
  };

  const filteredData = data.filter((item) =>
    deepSearch(item, search)
  );
  /* ================= PAGINATION LOGIC ================= */
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );
  // Edit handlers
  const handleEditClick = (item, module) => {
    setEditFormData(item);
    setEditModule(module);
    setEditId(item._id);
    setEditModalOpen(true);
  };

  const handleEditChange = (key, value) => {
    if (key.includes(".")) {
      const keys = key.split(".");
      setEditFormData((prev) => {
        let temp = { ...prev };
        let ref = temp;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!ref[keys[i]]) ref[keys[i]] = {};
          ref = ref[keys[i]];
        }
        ref[keys[keys.length - 1]] = value;
        return { ...temp };
      });
    } else {
      setEditFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDataAPI(editModule, editId, editFormData);
      alert("Record updated successfully");
      setEditModalOpen(false);
      setData((prev) =>
        prev.map((item) =>
          item._id === editId ? { ...item, ...editFormData } : item
        )
      );
    } catch (err) {
      console.error("Error updating record:", err);
      alert("Error updating record");
    }
  };

  const handleDelete = async (module, id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await deleteDataAPI(module, id);
      alert("Record deleted successfully");
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting record:", err);
      alert("Error deleting record");
    }
  };

  // Determine editable fields per role
  const isFieldEditable = (key) => {
    if (role === "HR" && activeTab === "admission") {
      return key.startsWith("payment.secondInstallment");
    }
    if (role === "admin" || role === "super-admin") return true;
    return false;
  };

  return (
    <div className="content"  
     style={{
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    overflowX: "auto",
  }}>
      {activeTab !== "create" && (
        // <div className="search-bar">
        //   <input
        //     type="text"
        //     placeholder="Search..."
        //     value={search}
        //     onChange={(e) => {
        //       setSearch(e.target.value);
        //       setCurrentPage(1);
        //     }}
        //     style={{ height: "45px" }}
        //   />
        // </div>

        <div
          className="search-bar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "320px",
              height: "46px",
              padding: "0 16px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "15px",
              outline: "none",
              transition: "0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
        </div>
      )}

      {activeTab === "create" ? (
        <CreateUser />
      ) : (
        < >
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }} >
            <thead >
              <tr style={{
      background: "#f9fafb",
      textAlign: "left",
    }}>
                <th >S.No</th>
                {fieldsToDisplay.map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th>Created By</th>
                <th>Updated By</th>
                <th>Created At</th>
                <th>Updated At</th>
                {((role === "admin" || role === "super-admin") ||
                  (role === "HR" && activeTab === "admission")) && (
                    <th>Action</th>
                  )}
              </tr>
            </thead>

            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={fieldsToDisplay.length + 7}>
                    No records found
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, idx) => (
                  <tr key={item._id} >
                    <td>{startIndex + idx + 1}</td>

                    {fieldsToDisplay.map((key) => {
                      const keys = key.split(".");
                      let val = item;
                      for (let k of keys) val = val?.[k];
                      return <td key={key}>{val ?? "-"}</td>;
                    })}

                    <td>{item.createdBy ?? "-"}</td>
                    <td>{item.updatedBy ?? "-"}</td>
                    <td>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : "-"}
                    </td>
                    <td>
                      {item.updatedAt
                        ? new Date(item.updatedAt).toLocaleString()
                        : "-"}
                    </td>

                    {((role === "admin" || role === "super-admin") ||
                      (role === "HR" &&
                        activeTab === "admission")) && (
                        <td>
                          <button
                             style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    background: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
  }}
                            onClick={() => handleEditClick(item, activeTab)}>
                            <MdModeEdit /> Edit
                          </button>
                          {(role === "admin" ||
                            role === "super-admin") && (
                              <button

                                onClick={() =>
                                  handleDelete(activeTab, item._id)
                                }
                                style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #ef4444",
    background: "#fff",
    color: "#ef4444",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    marginLeft: "8px",
  }}
                              >
                                <MdDelete /> Delete
                              </button>
                            )}
                        </td>
                      )}
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* ================= PAGINATION UI ================= */}
          {/* {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
              style={{ color: "red" , padding:"5px 20px", }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  style={{
                    padding:"5px 10px",
                    fontWeight:
                      currentPage === i + 1 ? "bold" : "normal",
                  }}
                >
                  {i + 1}
                </button>
              ))}

              <button
              style={{ color: "" , padding:"5px 20px", }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )} */}

          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "6px",
                marginTop: "25px",
                flexWrap: "wrap",
              }}
            >
              {/* Prev Button */}
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  background: currentPage === 1 ? "#f3f4f6" : "#fff",
                  color: currentPage === 1 ? "#9ca3af" : "#4b5563",
                  fontWeight: 500,
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Prev
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                const isActive = currentPage === page;

                return (
                  <button
                    type="button"
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      minWidth: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: isActive ? "none" : "1px solid #d1d5db",
                      background: isActive ? "#4f46e5" : "#fff",
                      color: isActive ? "#fff" : "#4b5563",
                      fontWeight: isActive ? 600 : 500,
                      cursor: "pointer",
                      boxShadow: isActive
                        ? "0 4px 12px rgba(79,70,229,0.3)"
                        : "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  background: currentPage === totalPages ? "#f3f4f6" : "#fff",
                  color: currentPage === totalPages ? "#9ca3af" : "#4b5563",
                  fontWeight: 500,
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Next
              </button>
            </div>
          )}




          {/* ================================================== */}
        </>
      )}
      {/* </div> */}
      {/* ) */}

      {/* Edit Modal */}
      {editModalOpen && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      backdropFilter: "blur(4px)",
    }}
  >
    <div
      style={{
        background: "#fff",
        width: "520px",
        borderRadius: "14px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        maxHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        animation: "fadeIn 0.25s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "18px 24px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: 600,
            color: "#1f2937",
            textTransform: "capitalize",
          }}
        >
          Edit {activeTab} Record
        </h2>

        <button
          type="button"
          onClick={() => setEditModalOpen(false)}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "#6b7280",
          }}
        >
          ×
        </button>
      </div>

      {/* Body */}
      <form
        onSubmit={handleEditSubmit}
        style={{
          padding: "22px 24px",
          overflowY: "auto",
          flex: 1,
        }}
      >
        {fieldsToDisplay.map((key) => (
          <div key={key} style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "6px",
                textTransform: "capitalize",
              }}
            >
              {key.replace(/([A-Z])/g, " $1")}
            </label>

            <input
              type="text"
              value={
                key.includes(".")
                  ? key.split(".").reduce((o, k) => o?.[k], editFormData) ?? ""
                  : editFormData[key] ?? ""
              }
              onChange={(e) => handleEditChange(key, e.target.value)}
              disabled={!isFieldEditable(key)}
              style={{
                width: "100%",
                height: "42px",
                padding: "0 12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                outline: "none",
                backgroundColor: !isFieldEditable(key)
                  ? "#f3f4f6"
                  : "#fff",
                cursor: !isFieldEditable(key) ? "not-allowed" : "text",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "#4f46e5")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "#d1d5db")
              }
            />
          </div>
        ))}

        {/* Footer Buttons */}
        <div
          style={{
            position: "sticky",
            bottom: 0,
            background: "#fff",
            paddingTop: "16px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <button
            type="button"
            onClick={() => setEditModalOpen(false)}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              background: "#fff",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#4f46e5",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 6px 14px rgba(79,70,229,0.3)",
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
  );
};

export default Content;
