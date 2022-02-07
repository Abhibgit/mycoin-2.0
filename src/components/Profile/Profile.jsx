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
import PublishIcon from "@mui/icons-material/Publish";

function Profile(props) {
  const [formState, setFormState] = React.useState({
    name: props.user.name,
    email: props.user.email,
    password: props.user.password,
  });

  const handleEditSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const fetchResponse = await fetch(`/api/users/${props.user._id}/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          password: formState.password,
        }),
      });

      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json();
      localStorage.setItem("token", token);

      const userDoc = JSON.parse(atob(token.split(".")[1])).user;
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
      <Typography sx={{ margin: 2, fontSize: { xs: 30, md: 40 } }}>
        Personal Information
      </Typography>
      <Card sx={{ boxShadow: 3, borderRadius: 5 }}>
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
            <CardActions>
              <Button type="submit" variant="outlined" sx={{ margin: 1 }}>
                <PublishIcon />
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
