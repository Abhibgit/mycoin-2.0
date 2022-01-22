import React from "react";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";

export default function LoginPage(props) {
  return (
    <main className="LoginPage">
      <Login setUserInState={props.setUserInState} />
      <SignUp setUserInState={props.setUserInState} />
    </main>
  );
}
