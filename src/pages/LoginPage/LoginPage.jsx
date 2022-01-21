import React from "react";
import LoginForm from "../../components/Login/Login";

export default function LoginPage(props) {
  const [showSignup, setShowSignup] = React.useState(false);

  return (
    <main className="LoginPage">
      <div>
        <h3> LOGIN IN</h3>
      </div>

      <LoginForm setUserInState={props.setUserInState} />
      <button onClick={setShowSignup.useState(true)}>
        <a href="/user/signup">SIGN UP</a>
      </button>
    </main>
  );
}
