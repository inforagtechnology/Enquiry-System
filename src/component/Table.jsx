import React from "react";
import "../App.css";

const Table = ({ data }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {data[0] &&
            Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {Object.values(row).map((val, i) => (
              <td key={i}>{val}</td>
            ))}
            <td>
              <button className="edit">Edit</button>
              <button className="delete">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
