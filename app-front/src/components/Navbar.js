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
      <div>
        <div>
          <Link to="/">
            <h3>Mangeons Ensemble</h3>
          </Link>
          <Link to="/restaurants">
            <h3>Restaurants</h3>
          </Link>
        </div>
        {uid ? (
          <>
            <div>
              <Link to="/profil">
                <h5>Bienvenue {userData.pseudo}</h5>
              </Link>
            </div>
            <div>
              <Logout />
            </div>
          </>
        ) : (
          <div>
            <Link to="/profil">Connexion</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
