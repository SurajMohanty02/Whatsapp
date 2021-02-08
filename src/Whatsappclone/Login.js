import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";
import { actionTypes } from "./reducer";
import { useStatevalue } from "./StateProvider";

const Login = () => {
  const [{}, dispatch] = useStatevalue();
  const SingIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1-1.png"
          alt="Logo"
        />
        <div className="login__text">
          <h1>Sign In to Whatsapp</h1>
        </div>

        <Button onClick={SingIn}>sign in with Google</Button>
      </div>
    </div>
  );
};

export default Login;
