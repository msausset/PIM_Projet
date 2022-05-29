import React from "react";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);

  const style = {
    border: "1px solid red",
    width: "200px",
    height: "200px",
  };

  return (
    <div>
      <h1>Profil de {userData.pseudo}</h1>
      <div>
        <h3>Photo de profil</h3>

        <img src={userData.picture} style={style} alt="" />

        <UploadImg />
      </div>
    </div>
  );
};

export default UpdateProfil;
