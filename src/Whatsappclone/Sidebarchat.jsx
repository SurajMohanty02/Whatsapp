import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Sidebarchat.css";
import { id, name } from "./Sidebar";
import db from "./firebase";
import { Link } from "react-router-dom";
const Sidebarchat = ({ addNewChat, id, name }) => {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.round(Math.random() * 10000));
  }, []);
  const createNewChat = () => {
    const chatName = prompt("Enter the chat Name ");
    if (chatName) {
      db.collection("rooms").add({
        name: chatName,
      });
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarchat">
        <Avatar src={`https://avatars.dicebear.com/api/humans/${seed}.svg`} />
        <div className="sidebarchat__info">
          <h2>{name}</h2>
          <p>last chat..</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createNewChat} className="sidebarchat new__chat">
      <h2>Add New Chat</h2>
    </div>
  );
};

export default Sidebarchat;
