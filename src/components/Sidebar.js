import React, { useState } from "react";

function Sidebar({ handleSearchClick, searchResults }) {
  const [keyword, setKeyword] = useState("");

  return (
    <div style={{ display: "flex" }}>
      <div>
        <h2> Search </h2>
        <input
          type="text"
          placeholder="keywords"
          value={keyword}
          onChange={e => {
            e.preventDefault();
            setKeyword(e.target.value);
          }}
        />
        <input
          type="submit"
          value="Search"
          onClick={e => {
            handleSearchClick(e, keyword);
          }}
        />
      </div>
    </div>
  );
}

export default Sidebar;
