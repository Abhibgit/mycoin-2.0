import React from "react";
import SignUp from "../../components/SignUp/SignUp";

function SignupPage(props) {
  // console.log("signup page");
  return (
    <main className="SignUpPage">
      <div>
        <h3> SIGN UP </h3>
      </div>

      <SignUp setUserInState={props.setUserInState} />
    </main>
  );
}

export default SignupPage;
