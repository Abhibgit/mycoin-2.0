import { Component } from "react";
import { Card, Input, CardContent, Button } from "@mui/material";

export default class Login extends Component {
  state = {
    name: "",
    password: "",
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
      const fetchResponse = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.state.name,
          password: this.state.password,
        }),
      });

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json();
      localStorage.setItem("token", token);

      let userDoc = JSON.parse(atob(token.split(".")[1])).user;
      this.props.setUserInState(userDoc);
    } catch (err) {
      console.log("LoginForm error", err);
      this.setState({ error: "Login Failed - Try Again" });
    }
  };

  render() {
    return (
      <div>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <h2>Login</h2>
            <div className="form-container" onSubmit={this.handleSubmit}>
              <form autoComplete="off">
                <Input
                  color="secondary"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                  label="Username"
                  placeholder="Username"
                />
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                  placeholder="Password"
                />
                <Button type="submit" variant="outlined">
                  LOG IN
                </Button>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }
}
