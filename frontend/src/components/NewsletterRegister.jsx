import { useState } from "react";
import axios from "axios";

export default function NewsletterRegister() {
  const [email, setEmail] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const registerMail = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/newsletter`, {
        email,
      })
      .then((response) => {
        console.info(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="newsletter_register">
      <h1>Inscription à la newsletter</h1>
      <form onSubmit={registerMail}>
        <input type="email" onChange={handleChangeEmail} />
        <input type="submit" />
      </form>
    </div>
  );
}
