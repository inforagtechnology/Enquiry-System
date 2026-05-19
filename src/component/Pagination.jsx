import React from "react";
// import "./Dashboard.css";

const Pagination = ({ page, setPage }) => {
  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
      <span>{page}</span>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
