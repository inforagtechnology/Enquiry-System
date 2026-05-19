import React, { useEffect, useState } from "react";
// import "../App.css";

const Notification = ({ count }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (count % 50 === 0 && count > 0) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return show ? <div className="notification">You have crossed {count} admissions!</div> : null;
};

export default Notification;
