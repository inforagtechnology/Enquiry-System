// import axios from "axios";

// //const BASE_URL = "https://backend-2-xfhu.onrender.com";

// const BASE_URL = "http://localhost:5000"

// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   return { Authorization: `Bearer ${token}` };
// };

// export const getAdmissions = async () => {
//   return await axios.get(`${BASE_URL}/admissions`, { headers: getAuthHeaders() });
// };

// export const getRegistrations = async () => {
//   return await axios.get(`${BASE_URL}/registrations`, { headers: getAuthHeaders() });
// };


import axios from "axios";

// Automatically switches between production and local URLs dynamically
const BASE_URL = import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAdmissions = async () => {
  return await axios.get(`${BASE_URL}/admissions`, { headers: getAuthHeaders() });
};

export const getRegistrations = async () => {
  return await axios.get(`${BASE_URL}/registrations`, { headers: getAuthHeaders() });
};
