import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      {/* Optionally, you can add a footer here */}
    </>
  );
}

export default Layout;
