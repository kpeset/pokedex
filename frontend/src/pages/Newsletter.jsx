import { useState } from "react";
import axios from "axios";

export default function Newsletter() {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");

  const sendEmail = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/send-newsletter`, {
        subject,
        text,
        html,
      })
      .then((response) => {
        console.info(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChangeSubject = (event) => {
    setSubject(event.target.value);
  };

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  const handleChangeHtml = (event) => {
    setHtml(event.target.value);
  };

  return (
    <div className="newsletter_page">
      <h1>Envoyer une newsletter</h1>
      <form onSubmit={sendEmail}>
        <p>Titre</p>
        <input type="text" onChange={handleChangeSubject} />
        <p>Texte</p>
        <textarea onChange={handleChangeText} />
        <p>HTML</p>
        <textarea onChange={handleChangeHtml} />
        <input type="submit" />
      </form>
    </div>
  );
}
