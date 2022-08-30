import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./NavBar";

const SharedContent = () => {
  return (
    <div className="App">
      <header>Billz App</header>
      <div className="container">
        <Nav />
        <div className="info">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SharedContent;
