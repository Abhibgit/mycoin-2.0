import React from "react";

function Profile(props) {
  return (
    <div>
      <h1>Hello, {props.user.name}</h1>
      <h2>Email {props.user.email}</h2>
      <h2>Password {props.user.password}</h2>
    </div>
  );
}

export default Profile;
