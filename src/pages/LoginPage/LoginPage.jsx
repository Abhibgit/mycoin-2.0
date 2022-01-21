import React from "react";
import LoginForm from "../../components/Login/Login";

export default function LoginPage(props) {
  return (
    <main className="LoginPage">
      <LoginForm setUserInState={props.setUserInState} />
    </main>
  );
}
