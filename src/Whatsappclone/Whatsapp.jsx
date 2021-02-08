import React, { useState } from "react";
import { BrowserRouter, Route, Switch, link } from "react-router-dom";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import "./Whatsapp.css";
const Whatsapp = () => {
  const [user, setuser] = useState();
  return (
    <div className="Whatsapp">
      {!user ? (
        <h1>Log In</h1>
      ) : (
        <BrowserRouter>
          <Switch>
            <Route path="/rooms/:roomid">
              <Sidebar />
              <Chat />
            </Route>
            <Route path="/">
              <Sidebar />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
};

export default Whatsapp;
