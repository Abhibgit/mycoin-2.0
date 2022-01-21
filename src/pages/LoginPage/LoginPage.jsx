import React from "react";
import LoginForm from "../../components/Login/Login";

export default function LoginPage(props) {
  return (
    <main className="LoginPage">
      <div>
        <h3> LOGIN IN</h3>
      </div>

      <LoginForm setUserInState={props.setUserInState} />
    </main>
  );
}
