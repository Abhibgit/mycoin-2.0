import React, { useState } from "react";
import Login from "../../components/Login/Login";
import SignUp from "../../components/SignUp/SignUp";
import { Button, Card, Grid, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AuthPage(props) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Grid
      item
      xs={6}
      justifyContent="center"
      style={{ minHeight: "100vh", margin: 250 }}
    >
      <Card alignItems="center">
        <Typography>Welcome! Please log in below</Typography>
        {showLogin ? (
          <Login setUserInState={props.setUserInState} />
        ) : (
          <SignUp setUserInState={props.setUserInState} />
        )}
        <Button onClick={() => setShowLogin(!showLogin)}>
          {showLogin
            ? "Not a member? Click here to sign up"
            : "Already a member? Click here to log in"}
        </Button>
      </Card>
    </Grid>
  );
}
