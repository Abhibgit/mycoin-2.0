import React from "react";
import LoginForm from "../../components/Login/Login";

export default function LoginPage(props) {
  console.log("login page");
  return (
    <main className="login page">
      <div>
        <h3> LOGIN IN</h3>
      </div>

      <LoginForm setUserInState={props.setUserInState} />
    </main>
  );
}
