import React, { useState } from "react";

function SignUpForm(props) {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    setUser({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // 1. POST our new user info to the server
      const fetchResponse = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      });

      // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");

      let token = await fetchResponse.json(); // 3. decode fetch response to get jwt from srv
      localStorage.setItem("token", token); // 4. Stick token into localStorage

      const userDoc = JSON.parse(atob(token.split(".")[1])).user; // 5. Decode the token + put user document into state
      console.log("created_user: " + userDoc);
      props.setUserInState(userDoc);
    } catch (err) {
      console.log("SignupForm error", err);
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  const disable = user.password !== user.confirm;
  return (
    <div>
      <div className="form-container"></div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <br />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <br />
        <label>Confirm</label>
        <input
          type="password"
          name="confirm"
          value={user.confirm}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit" disabled={disable}>
          SIGN UP
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
