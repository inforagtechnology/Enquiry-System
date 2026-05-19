// import React, { useState } from "react";
// import logoimg from "../component/images/logo.jpg";
// import { redirect, useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate()
// const handleHome = ()=>{
//     navigate("/")
// }
// const handleAbout = ()=>{
//     navigate("/about")
// }
// const handleregister = () =>{
//     navigate("/registration")
// }
// const handleAdmission = () =>{
//     navigate("/form_selector")
// }


// const hadleSignup = ()=>{
//   navigate("/signup")
//   console.log("button tap");
// }
//   return (
//     <nav className="navbar">
//       {/* Left - Logo */}
//       <div className="logo">
//         <img src={logoimg} alt="Logo" />
//       </div>

//       {/* Center - Main navigation */}
//       <div className={`nav-center ${isOpen ? "open" : ""}`}>
//         <button onClick={handleHome}>Home</button>
//         <button onClick={handleAbout}>About</button>
//         <button onClick={handleregister}>Registration</button>
//         <button onClick={handleAdmission}>Admission</button>
//         <button className="singup-btn-mobile"  onClick={hadleSignup}>Singup</button>

//         {/* Close button inside menu */}
//         <span className="close-menu" onClick={() => setIsOpen(false)}>
//           &times;
//         </span>
//       </div>  

//       {/* Right - Enquiry Button for desktop */}
//       <div className="nav-right">
//         <button className="singup-btn"  onClick={hadleSignup} type="" >Signup</button>
//       </div>

//       {/* Hamburger menu for mobile */}
//       <div className="hamburger" onClick={() => setIsOpen(true)}>
//         <span className="bar"></span>
//         <span className="bar"></span>
//         <span className="bar"></span>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;





import React, { useState } from "react";
// import logoimg from "../component/images/logo.jpg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // close menu on mobile when navigating
  };

  return (
    <nav className="navbar">
      {/* Left - Logo */}
      <div className="logo" onClick={() => handleNavigation("/")}>
        <img src={"https://codeofschool.com/img/cos-white-logo.webp"} alt="Logo" />
      </div>

      {/* Center - Main navigation */}
      <div className={`nav-center ${isOpen ? "open" : ""}`}>
        <button onClick={() => handleNavigation("/")}>Home</button>
        <button onClick={() => handleNavigation("/about")}>About</button>
        <button onClick={() => handleNavigation("/registration")}>Registration</button>
        <button onClick={() => handleNavigation("/form_selector")}>Admission</button>
        <button className="signup-btn-mobile" onClick={() => handleNavigation("/signup")}>
          Signup
        </button>

        {/* Close button inside menu */}
        <span className="close-menu" onClick={() => setIsOpen(false)}>
          &times;
        </span>
      </div>

      {/* Right - Signup Button (Desktop) */}
      <div className="nav-right">
        <button className="signup-btn" onClick={() => handleNavigation("/signup")}>
          Signup
        </button>
      </div>

      {/* Hamburger (Mobile) */}
      <div className="hamburger" onClick={() => setIsOpen(true)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
