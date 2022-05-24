import React from "react";
import "../../App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Restaurant from "../../pages/Restaurant";
import Profil from "../../pages/Profil";

const index = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/restaurant" element={<Restaurant />} />
      </Routes>
    </Router>
  );
};

export default index;
