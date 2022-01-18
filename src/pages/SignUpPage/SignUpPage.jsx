import React from "react";
import SignUpForm from "../../components/SignUp/SignUp";

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
