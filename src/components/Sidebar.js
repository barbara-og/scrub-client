import React from "react";

function Sidebar() {
  const [keyword, setKeyword] = useState("");

  function handleSearchClick(e) {
    e.preventDefault();
    fetch("url here").then(console.log(res));
  }
  return (
    <div style={{ display: "flex" }}>
      <div>
        <h2> I am a sidebar</h2>
        <input
          type="text"
          placeholder="keywords"
          onChange={e => {
            e.preventDefault();
            setKeyword(e.target.value);
          }}
        />
        <input
          type="submit"
          value="Search"
          onClick={e => {
            handleSearchClick(e);
          }}
        />
      </div>
    </div>
  );
}

export default Sidebar;
