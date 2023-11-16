import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MessageCard from "../components/MessageCard";

export default function Messages() {
  const [data, setData] = useState([]);

  const userId = localStorage.getItem("id");

  console.info("id", userId);

  const getAllConversations = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/messages/${userId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  console.info(data);

  useEffect(() => {
    getAllConversations();
  }, []);

  return (
    <>
      <h1>Liste des conversations</h1>
      {data.map((contact) => (
        <>
          <MessageCard contact={contact} />
          <Link
            key={contact.userId}
            to={`/messages/${userId}/${contact.userId}`}
          >
            Voir la conversation
          </Link>
        </>
      ))}
    </>
  );
}
