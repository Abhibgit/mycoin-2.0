import React, { useState } from "react";
import Watchlist from "../../components/Watchlist/Watchlist";
import Profile from "../../components/Profile/Profile";

function ProfilePage() {
  const [user, setUser] = useState({
    name: "Test",
    email: "test@test.com",
    password: "initialPassword",
  });
  return (
    <div>
      <Profile user={user}></Profile>
    </div>
  );
}

export default ProfilePage;
