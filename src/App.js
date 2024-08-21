import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Import your pages
import Home from "./Pages/Home";
import Startups from "./Pages/Startups";
import Investors from "./Pages/Investors";
import Mentors from "./Pages/Mentors";
import AboutUs from "./Pages/AboutUs";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/startups" element={<Startups />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
