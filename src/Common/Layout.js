import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Layout({ children ,comp}) {
  return (
    <>
      <Navbar comp={comp} />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
