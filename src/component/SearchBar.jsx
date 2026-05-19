import React from "react";


const SearchBar = ({ search, setSearch, onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by mobile..."
      />
      <button className="btn btn-search" onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
