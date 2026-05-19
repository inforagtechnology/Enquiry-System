// import axios from "axios";

// // Create an axios instance
// const API = axios.create({
//   baseURL: "http://localhost:5000", // backend ka URL
// });

// // Add token automatically to all requests if logged in
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


// export default API;


// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000",
//   headers: { "Content-Type": "application/json" }
// });

// export default API;




import axios from "axios";

// Create Axios instance for dashboard API
const API = axios.create({
  baseURL: "http://localhost:5000", // backend base URL
  headers: { "Content-Type": "application/json" },
});

// Automatically attach JWT token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

// -------------------------
// Dashboard API calls
// -------------------------

// Get data for logged-in user
export const getUserData = () => API.get("/dashboard/mydata");

// Get HR-specific data
export const getHRData = () => API.get("/dashboard/hrdata");

// Get Admin/Super Admin data
export const getAllData = () => API.get("/dashboard/all");

// Check notification after every 50 admissions
export const checkNotification = () => API.get("/dashboard/checkNotification");

// Create HR/Admin (only Super Admin)
export const createAdminOrHR = (payload) => API.post("/admin/create", payload);

// Update data 
// export const updatedata = () => API.put("/dashboard/")
export const updateDataAPI = (module, id, data) => 
  API.put(`/dashboard/${module}/${id}`, data);

export const deleteDataAPI = (module, id) => 
  API.delete(`/dashboard/${module}/${id}`);
