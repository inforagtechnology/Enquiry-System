import React from "react";
// import "./Dashboard.css";

const DashboardTable = ({ data, type, onEdit, onDelete }) => {
  if (!data || data.length === 0) {
    return <p className="no-data">No {type} data found</p>;
  }

  const keys = Object.keys(data[0]).filter(k => k !== "_id" && k !== "__v");

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id}>
              {keys.map((key) => (
                <td key={key}>
                  {typeof row[key] === "object" ? JSON.stringify(row[key]) : row[key]}
                </td>
              ))}
              <td>
                <button className="btn btn-edit" onClick={() => onEdit(type, row._id)}>Edit</button>
                <button className="btn btn-delete" onClick={() => onDelete(type, row._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
