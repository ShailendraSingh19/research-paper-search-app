import React from 'react';

const SearchBar = ({ handleSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
        placeholder="Search for research papers..."
      />
    </div>
  );
};

export default SearchBar;
