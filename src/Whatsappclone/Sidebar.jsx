import { Avatar, Icon, IconButton } from "@material-ui/core";
import {
  Chat,
  DonutLargeOutlined,
  MoreVertOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import db, { auth } from "./firebase";
import "./Sidebar.css";
import Sidebarchat from "./Sidebarchat";
import { useStatevalue } from "./StateProvider";
const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStatevalue();
  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => {
          return { id: doc.id, data: doc.data() };
        })
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          src={user.photoURL}
          className="avtar"
          onClick={auth.signOut()}
        />
        <div className="sidebar__rightheader">
          <IconButton>
            <DonutLargeOutlined />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVertOutlined />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchcontainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chat">
        <Sidebarchat addNewChat />
        {rooms.map((room) => {
          return (
            <Sidebarchat key={room.id} name={room.data.name} id={room.id} />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
