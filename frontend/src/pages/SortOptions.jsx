import React from "react";
import styles from "../styles/styles";

const SortOptions = ({ sortBy, sortOrder, handleSortChange }) => {
  return (
    <div>
      {/* Sort By Dropdown */}
      <div className="flex items-center mb-3">
        <label className="mr-3">Sort By:</label>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value, sortOrder)}
        >
          <option value="createdAt">Latest</option>
          <option value="price">Price (Low to High)</option>
          {/* Add more sort options as needed */}
        </select>
      </div>

      {/* Sort Order Dropdown */}
      <div className="flex items-center">
        <label className="mr-3">Sort Order:</label>
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={sortOrder}
          onChange={(e) => handleSortChange(sortBy, e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default SortOptions;