import React from "react";

function SearchBar() {
  return (
    <div className="searchBar">
      <input placeholder="Поиск" className="search"/>
      <select className="sort">
        <option>дата</option>
        <option>избранное</option>
        <option>результат</option>
      </select>
    </div>
  );
}

export default SearchBar;
