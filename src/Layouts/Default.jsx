import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Default = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Default;
