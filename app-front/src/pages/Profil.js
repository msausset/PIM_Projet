import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div>
      {uid ? (
        <h1>UPDATE PAGE</h1>
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