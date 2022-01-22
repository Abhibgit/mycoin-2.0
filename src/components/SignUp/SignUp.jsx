import React from "react";
import { Component } from "react";
import { Input, Card, Button, CardContent, Typography } from "@mui/material";

export default class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // 1. POST our new user info to the server
      const fetchResponse = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }),
      });

      // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json(); // 3. decode fetch response to get jwt from srv
      localStorage.setItem("token", token); // 4. Stick token into localStorage

      let userDoc = JSON.parse(atob(token.split(".")[1])).user; // 5. Decode the token + put user document into state
      console.log("created_user: " + userDoc);
      this.props.setUserInState(userDoc);
    } catch (err) {
      console.log("SignupForm error", err);
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <div className="form-container"></div>
            <form autoComplete="off" onSubmit={this.handleSubmit}>
              <Input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
                placeholder="Name"
              />
              <br />
              <Input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
                placeholder="Email"
              />
              <br />

              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
                placeholder="Password"
              />
              <br />

              <Input
                type="password"
                name="confirm"
                value={this.state.confirm}
                onChange={this.handleChange}
                required
                placeholder="Confirm Password"
              />
              <br />
              <Button type="submit" disabled={disable} variant="outlined">
                SIGN UP
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}
