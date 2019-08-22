import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TweetsView from "../components/TweetsView";

function Dashboard() {
  const [searchResults, setSearchResults] = useState([]);
  const [toDisplay, setToDisplay] = useState([]);

  function handleSearchClick(e, keyword) {
    e.preventDefault();
    console.log("keyword in handle search", keyword);
    fetch("http://localhost:4000/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ keyword: keyword })
    })
      .then(res => res.json())
      .then(resJson => {
        if (resJson.success) {
          setSearchResults(resJson.matches);
          setToDisplay(resJson.matches);
        }
      })
      .catch(err => console.log("error searching:", err));
  }

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          flex: 2,
          border: "solid skyblue 5px",
          alignContent: "center"
        }}
      >
        <Sidebar
          handleSearchClick={handleSearchClick}
          searchResults={searchResults}
        />
      </div>
      <div style={{ flex: 6, border: "solid skyblue 5px" }}>
        <TweetsView
          toDisplay={toDisplay}
          setToDisplay={setToDisplay}
          // searchResults={searchResults}
          // onDeleteClick={onDeleteClick}
          // deleteList={deleteList}
        />
      </div>
    </div>
  );
}

export default Dashboard;
