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

    const firstNameError = document.querySelector(".firstName.error");
    const lastNameError = document.querySelector(".lastName.error");
    const emailError = document.querySelector(".email.error");
    const pseudoError = document.querySelector(".pseudo.error");
    const passwordError = document.querySelector(".password.error");
    const controlPasswordError = document.querySelector(
      ".controlPassword.error"
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
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
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
          <div className="firstName error"></div>

          <label htmlFor="">Nom</label>
          <br />
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <div className="lastName error"></div>

          <label htmlFor="">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>

          <label htmlFor="">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={(e) => setPseudo(e.target.value)}
            value={pseudo}
          />
          <div className="pseudo error"></div>

          <label htmlFor="">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>

          <label htmlFor="">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="controlPassword"
            id="controlPassword"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="controlPassword error"></div>
          <br />

          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
