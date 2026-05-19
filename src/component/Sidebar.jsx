// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../App.css";

// const Sidebar = ({ setPage }) => {
//   const role = localStorage.getItem("role");
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("userId");
//     navigate("/login", { replace: true });
//   };

//   return (
//     <div className="sidebar">
//       <div>
//         {["admin", "hr"].includes(role) && (
//           <>
//             <button onClick={() => setPage("registration")}>Registration</button>
//             <button onClick={() => setPage("admission")}>Admission</button>
//             <button onClick={() => setPage("enquiry")}>Enquiry</button>
//             <button onClick={() => navigate("/navigation")}>Navigation</button>
//           </>
//         )}
//         {role === "user" && (
//           <button onClick={() => setPage("registration")}>My Registration</button>
//         )}
//       </div>
//       <button className="logout" onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";

const Sidebar = ({ activeTab, setActiveTab, user }) => {
  const role = user.role || "user";

  return (
    <div className="sidebar">
      <div className="profile">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="profile"
          className="profile-pic"
          width={100}
          height={100}
        />
        {/* <div>{user.name || "User Name"}</div> */}
        <div className="role">{role}</div>
      </div>

      <div className="menu">
        <button
          className={activeTab === "registration" ? "active" : ""}
          onClick={() => setActiveTab("registration")}
        >
          Registration
        </button>
        <button
          className={activeTab === "admission" ? "active" : ""}
          onClick={() => setActiveTab("admission")}
        >
          Admission
        </button>
        <button
          className={activeTab === "enquiry" ? "active" : ""}
          onClick={() => setActiveTab("enquiry")}
        >
          Enquiry
        </button>
        {role === "super-admin" && (
          <button
            className={activeTab === "create" ? "active" : ""}
            onClick={() => setActiveTab("create")}
          >
            Create HR/Admin
          </button>
        )}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;



