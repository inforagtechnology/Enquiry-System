import React, { useEffect, useState } from "react";
import API from "../component/API";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  const fetchAdminData = async () => {
    try {
      const res = await API.get("/dashboard/all");
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const checkAdmissionNotification = async () => {
    try {
      const res = await API.get("/dashboard/notify");
      if (res.data.notify) {
        toast.info(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAdminData();
    checkAdmissionNotification();
    const interval = setInterval(checkAdmissionNotification, 60000); // poll every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <ToastContainer />
      <h1>Admin Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default AdminDashboard;
