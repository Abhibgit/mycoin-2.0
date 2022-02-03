import { Component } from "react";
import { Card, Input, CardContent, Button, Typography } from "@mui/material";

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
    console.log(this.state.name);
    console.log(this.state.password);
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
        <Card sx={{ minWidth: 275, backgroundColor: "#fcfaed", boxShadow: 2 }}>
          <CardContent>
            <Typography
              sx={{ margin: 1, marginBottom: 5, marginLeft: 10, fontSize: 25 }}
            >
              Welcome! Please log in below
            </Typography>
            <div className="form-container" onSubmit={this.handleSubmit}>
              <form autoComplete="off">
                <Input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                  label="Username"
                  placeholder="Username"
                  sx={{ margin: 3 }}
                />
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                  placeholder="Password"
                  sx={{ marginRight: 3 }}
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
