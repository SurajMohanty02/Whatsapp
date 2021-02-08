import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFileOutlined,
  EmojiEmotionsOutlined,
  MicNoneOutlined,
  MoreVertOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import { useStatevalue } from "./StateProvider";
import firebase from "firebase";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [{ user }, dispatch] = useStatevalue();
  const [value, setvalue] = useState("");
  const { roomid } = useParams();
  const [RoomName, setRoomName] = useState("");
  const [messages, setmessages] = useState([]);

  useEffect(() => {
    if (roomid) {
      db.collection("rooms")
        .doc(roomid)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });
      db.collection("rooms")
        .doc(roomid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setmessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomid]);

  useEffect(() => {
    setSeed(Math.round(Math.random() * 10000));
  }, []);
  const sendmsg = (e) => {
    e.preventDefault();

    db.collection("rooms").doc(roomid).collection("messages").add({
      message: value,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setvalue("");
  };
  console.log(messages.timestamp);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
        />
        <div className="chat__leftheader">
          <h2>{RoomName}</h2>
          <p>last seen....</p>
        </div>
        <div className="chat__rightheader">
          <SearchOutlined />
          <MoreVertOutlined />
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => (
          <p key={message} className={`chat__msg ${"chat__reciever"}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <IconButton>
          <EmojiEmotionsOutlined id="text" />
        </IconButton>
        <form>
          <input
            type="text"
            placeholder="Type a message"
            onChange={(e) => setvalue(e.target.value)}
            className="input"
            value={value}
          />

          <button className="btn__send" type="submit" onClick={sendmsg}>
            send
          </button>
        </form>
        <IconButton>
          <MicNoneOutlined id="text" />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
