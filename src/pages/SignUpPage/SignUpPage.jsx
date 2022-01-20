import React from "react";
import SignUpForm from "../../components/SignUp/SignUp";

function SignupPage(props) {
  const [showLogin, setShowLogin] = React.useState(false);

  console.log("signup page");
  return (
    <main className="SignUpPage">
      <div>
        <h3> SIGN UP</h3>
      </div>

      <SignUp setUserInState={props.setUserInState} />
    </main>
  );
}

export default SignupPage;
