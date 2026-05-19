import React, { useEffect, useState } from "react";
import { getAdmissions } from "../api/api";
// import "../App.css";

const Navigation = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAdmissions();
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="navigation-page">
      <h2>All Admissions</h2>
      <table className="table">
        <thead>
          <tr>
            {data[0] && Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((val, i) => <td key={i}>{val}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Navigation;
