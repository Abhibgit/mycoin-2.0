import {
  Typography,
  Card,
  CardContent,
  Button,
  Input,
  CardActions,
} from "@mui/material";
import React from "react";
import DeleteModal from "../DeleteModal/DeleteModal";

function Profile(props) {
  const [formState, setFormState] = React.useState({
    name: props.user.name,
    email: props.user.email,
    password: props.user.password,
  });

  const handleEditSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // 1. POST our new user info to the server
      const fetchResponse = await fetch(`/api/users/${props.user._id}/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          password: formState.password,
        }),
      });

      // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json(); // 3. decode fetch response to get jwt from srv
      localStorage.setItem("token", token); // 4. Stick token into localStorage

      const userDoc = JSON.parse(atob(token.split(".")[1])).user; // 5. Decode the token + put user document into state
      props.setUserInState(userDoc);
    } catch (err) {
      console.log("Edit Form error", err);
    }
  };

  const handleChange = (evt) => {
    setFormState({
      ...formState,
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  let deleteProps = {
    setUserInState: props.setUserInState,
    user_id: props.user._id,
  };

  return (
    <div>
      <Card sx={{ boxShadow: 3, backgroundColor: "#fcfaed" }}>
        <Typography style={{ margin: 20, fontSize: 45 }}>
          Personal Information
        </Typography>
        <CardContent>
          <form onSubmit={handleEditSubmit}>
            <Typography sx={{ padding: 2 }}>
              <Typography>Username</Typography>
              <Input
                name="name"
                defaultValue={props.user.name}
                onChange={handleChange}
                required
              />
            </Typography>
            <Typography sx={{ padding: 2 }}>
              <Typography>Email</Typography>
              <Input
                name="email"
                defaultValue={props.user.email}
                onChange={handleChange}
                required
              />
            </Typography>
            <Typography sx={{ padding: 2 }}>
              <Typography>Password</Typography>
              <Input
                name="password"
                type="password"
                defaultValue={props.user.password}
                onChange={handleChange}
                required
              />
            </Typography>
            <CardActions sx={{ justifyContent: "right" }}>
              <Button type="submit" variant="outlined" sx={{ margin: 5 }}>
                Submit
              </Button>
              <DeleteModal {...deleteProps} />
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
