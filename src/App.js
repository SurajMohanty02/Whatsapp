import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Whatsapp from "./Whatsappclone/Whatsapp";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Sidebar from "./Whatsappclone/Sidebar";
import Chat from "./Whatsappclone/Chat";
import Login from "./Whatsappclone/Login";
import { useStatevalue } from "./Whatsappclone/StateProvider";

function App() {
  const [{ user }, dispatch] = useStatevalue();
  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <div className="App-body">
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
        </div>
      )}
    </div>
  );
}

export default App;
