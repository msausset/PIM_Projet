import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  // uid défini -> affichage différent

  const uid = useContext(UidContext);

  return (
    <div>
      {uid ? (
        <UpdateProfil />
      ) : (
        <div>
          {/* Passage propriétés */}
          <Log signin={false} singup={true} />
        </div>
      )}
    </div>
  );
};

export default Profil;
