import React, { useState } from "react";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";

export default function LoginPage(props) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="LoginPage">
      <button onClick={() => setShowLogin({})}>
        {showLogin ? "Show sign up" : "Show Login "}
      </button>
      {console.log(showLogin)}
      {showLogin ? (
        <Login setUserInState={props.setUserInState} />
      ) : (
        <SignUp setUserInState={props.setUserInState} />
      )}
    </main>
  );
}
