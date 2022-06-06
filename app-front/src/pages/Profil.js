import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  // uid défini -> affichage différent

  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          {/* Passage propriétés */}
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/log.svg" alt="img" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
