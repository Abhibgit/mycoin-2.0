import { Component } from "react";

export default class Logout extends Component {
  handleSubmit = async (evt) => {
    evt.preventDefault();

    console.log("Log out button is clicked");
    localStorage.removeItem("token");
    window.location.reload(false);
  };

  render() {
    return (
      <div onClick={this.handleSubmit}>
        <button type="submit">Logout</button>
      </div>
    );
  }
}
