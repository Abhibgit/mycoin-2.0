import React from "react";
import SignUpForm from "../../components/SignUp/SignUp";

<<<<<<< HEAD
export default class SignUpPage extends React.Component {
  state = {
    showLogin: false,
  };

  render() {
    return (
      <main className="SignUpPage">
        <div>
          <h3
            onClick={() => this.setState({ showLogin: !this.state.showLogin })}
          >
            {this.state.showLogin ? "SIGN UP" : "LOG IN"}
          </h3>
        </div>

        <SignUpForm setUserInState={this.props.setUserInState} />
      </main>
    );
  }
}
=======
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
>>>>>>> 62963971b2a3f2a0b3c2f42a47c0e8ffc4680412
