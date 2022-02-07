import React, { useState } from "react";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";
import { Button, Card, Grid } from "@mui/material";

export default function AuthPage(props) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Grid container spacing={2}>
      <Grid item xs={7} md={5}>
        <Card className="auth-page-login">
          {showLogin ? (
            <Login setUserInState={props.setUserInState} />
          ) : (
            <SignUp setUserInState={props.setUserInState} />
          )}
          <Button
            onClick={() => setShowLogin(!showLogin)}
            className="auth-page-login-btn"
          >
            {showLogin
              ? "Not a member? Click here to sign up"
              : "Already a member? Click here to log in"}
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
}
