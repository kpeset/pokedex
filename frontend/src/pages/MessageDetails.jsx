// "/messages/sender/:userId/receiver/:receiverId"
// router.post("/send-message", messageControllers.sendMessageBetweenUsers);

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MessageContent from "../components/MessageContent";

export default function MessageDetails() {
  const { sender, receiver } = useParams();

  const [data, setData] = useState([]);
  const [content, setContent] = useState("");

  const getConversation = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/messages/sender/${sender}/receiver/${receiver}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setData(response.data.result);
      })
      .catch();
  };

  const sendMessage = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/send-message`, {
        sender,
        receiver,
        content,
      })
      .then((response) => {
        console.info(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleMessage = (event) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    getConversation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getConversation();
    }, 5000);
    return () => clearInterval(interval);
  });

  console.info(data);

  return (
    <>
      <h1>Conversation</h1>
      {data.map((message) => (
        <MessageContent message={message} />
      ))}
      <form className="message_text" onSubmit={sendMessage}>
        <textarea onChange={handleMessage} />
        <input type="submit" />
      </form>
    </>
  );
}
