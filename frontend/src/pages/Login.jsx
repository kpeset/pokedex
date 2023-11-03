import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const navigateToHomepage = () => {
    navigate("/pokedex");
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const sendCredentials = (event) => {
    event.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.info(response);
        setError(false);
        navigateToHomepage();
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };

  return (
    <>
      <h1>Espace connexion</h1>
      <form className="register_form" onSubmit={sendCredentials}>
        <p>Email</p>
        <input type="text" onChange={handleChangeEmail} />
        <p>Password</p>
        <input type="text" onChange={handleChangePassword} />
        <input
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "1rem 0",
          }}
          type="submit"
          value="Se connecter"
        />
      </form>

      {error ? "Email ou password incorrects" : ""}
    </>
  );
}
