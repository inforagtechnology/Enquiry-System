import axios from "axios";

const BASE_URL = "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getAdmissions = async () => {
  return await axios.get(`${BASE_URL}/admissions`, { headers: getAuthHeaders() });
};

export const getRegistrations = async () => {
  return await axios.get(`${BASE_URL}/registrations`, { headers: getAuthHeaders() });
};
