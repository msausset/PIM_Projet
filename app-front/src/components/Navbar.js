import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Navbar = () => {
  // Si uid est true (token actif) alors affichage différent

  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <div className="logo">
              <img src="./img/me.png" alt="logo" />
              <h3>Mangeons Ensemble</h3>
            </div>
          </Link>
        </div>
        {uid ? (
          // <>
          //   <div>
          //     <Link to="/profil">
          //       <h5>Bienvenue {userData.pseudo}</h5>
          //     </Link>
          //   </div>
          //   <div>
          //     <Logout />
          //   </div>
          // </>
          <ul>
            <li></li>
            <li className="welcome">
              <Link to="/profil">
                <h5>Bienvenue {userData.pseudo}</h5>
              </Link>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <Link to="/profil">
                <img src="./img/icons/login.svg" alt="login" />
              </Link>
            </li>
          </ul>
          // <div>
          //   <Link to="/profil">Connexion</Link>
          // </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
