import React from "react";
import { NavLink } from "react-router-dom";
const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink
            to="/"
            className={(navData) => (navData.isActive ? "active-left-nav" : "")}
          >
            <img src="./img/icons/home.svg" alt="" />
          </NavLink>
          <br />
          <NavLink
            to="/invitation"
            className={(navData) => (navData.isActive ? "active-left-nav" : "")}
          >
            <img src="./img/icons/calendar.svg" alt="" />
          </NavLink>
          <br />
          <NavLink
            to="/profil"
            className={(navData) => (navData.isActive ? "active-left-nav" : "")}
          >
            <img src="./img/icons/user.svg" alt="" />
          </NavLink>
          <br />
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
