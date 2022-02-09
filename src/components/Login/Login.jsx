import { Component } from "react";
import {
  Card,
  Input,
  CardContent,
  Button,
  Typography,
  Grow,
  CardActions,
} from "@mui/material";

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
        <Card sx={{ boxShadow: 1, borderRadius: 5 }}>
          <CardContent>
            <Typography
              sx={{
                fontSize: { xs: 20, md: 25 },
                marginTop: { xs: 1, md: 3 },
              }}
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
                  sx={{
                    marginTop: { xs: 3, md: 10 },
                    marginRight: { md: 2 },
                  }}
                />
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                  placeholder="Password"
                  sx={{ marginTop: { xs: 3, md: 10 } }}
                />
                <CardActions>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{
                      marginTop: 3,
                      marginBottom: -5,
                    }}
                  >
                    LOG IN
                  </Button>
                </CardActions>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }
}
