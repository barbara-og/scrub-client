import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TweetsView from "../components/TweetsView";

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 2, border: "solid black 5px" }}>
        <Sidebar />
      </div>
      <div style={{ flex: 6, border: "solid black 5px" }}>
        <TweetsView />
      </div>
    </div>
  );
}

export default Dashboard;
