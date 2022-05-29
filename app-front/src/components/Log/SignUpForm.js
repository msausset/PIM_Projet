import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

// Modal inscription

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const emailError = document.getElementById("emailError");
    const pseudoError = document.getElementById("pseudoError");
    const passwordError = document.getElementById("passwordError");
    const controlPasswordError = document.getElementById(
      "controlPasswordError"
    );

    controlPasswordError.innerHTML = "";

    // Contrôle et affichage des erreurs

    if (password !== controlPassword) {
      controlPasswordError.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/user/register`,
        data: {
          firstName,
          lastName,
          email,
          pseudo,
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            console.log(res);
            firstNameError.innerHTML = res.data.errors.firstName;
            lastNameError.innerHTML = res.data.errors.lastName;
            emailError.innerHTML = res.data.errors.email;
            pseudoError.innerHTML = res.data.errors.pseudo;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <h4>Enregistrement réussi, veuillez-vous connecter</h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="">Prénom</label>
          <br />
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <div id="firstNameError"></div>

          <label htmlFor="">Nom</label>
          <br />
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <div id="lastNameError"></div>

          <label htmlFor="">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div id="emailError"></div>

          <label htmlFor="">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div id="pseudoError"></div>

          <label htmlFor="">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div id="passwordError"></div>

          <label htmlFor="">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="controlPassword"
            id="controlPassword"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div id="controlPasswordError"></div>

          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
