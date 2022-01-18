import React from "react";
import LoginForm from "../../components/Login/Login";

export default class LoginPage extends React.Component {
  state = {
    showSignup: false,
  };

  render() {
    return (
      <main className="LoginPage">
        <div>
          <h3
            onClick={() => this.setState({ showLogin: !this.state.showSignup })}
          >
            {this.state.showSignup ? "LOG IN" : "SIGN UP"}
          </h3>
        </div>

        <LoginForm setUserInState={this.props.setUserInState} />
      </main>
    );
  }
}
