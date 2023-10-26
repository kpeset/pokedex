import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedPassword, setCheckedPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSucces] = useState(false);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeCheckedPassword = (event) => {
    setCheckedPassword(event.target.value);
  };

  const sendRegisterData = (event) => {
    event.preventDefault();

    if (password === checkedPassword) {
      axios
        .post("http://localhost:5000/users", {
          email,
          password,
        })
        .then((response) => {
          setSucces(response.data.message);
          setError(false);
          console.info(response);
        })
        .catch((err) => {
          if (
            err.response.data.error === `"email" is not allowed to be empty`
          ) {
            setError("L'email ne peut pas être vide");
          } else if (
            err.response.data.error === `"email" must be a valid email`
          ) {
            setError("Mettre un email valide");
          } else if (
            err.response.data.error === `"password" is not allowed to be empty`
          ) {
            setError("Merci de donner un password");
          } else if (
            err.response.data.error ===
            `"password" length must be at least 8 characters long`
          ) {
            setError("Le mot de passe doit faire au moins 8 caractères");
          } else if (err.response.data.error === 1062) {
            setError("L'email est déjà enregistré");
          } else {
            console.error(err.response.data.error);
          }
          setSucces(false);
        });
    } else {
      setError("Les mots de passe ne correspondent pas");
      console.error("Les mots de passe ne correspondent pas");
    }
  };

  return (
    <>
      <h1>Page d'enregistrement</h1>
      <form className="register_form" onSubmit={sendRegisterData}>
        <p>Email</p>
        <input type="email" onChange={handleChangeEmail} />
        <p>Password</p>
        <input type="password" onChange={handleChangePassword} />
        <p>Vérifier le password</p>
        <input type="password" onChange={handleChangeCheckedPassword} />
        <input
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "1rem 0",
          }}
          type="submit"
          value="S'enregistrer"
        />
      </form>
      {success ? <p>{success}</p> : ""}
      {error ? <p>{error}</p> : ""}
    </>
  );
}
