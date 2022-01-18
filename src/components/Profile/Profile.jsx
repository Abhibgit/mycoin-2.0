import React from "react";

function Profile(props, onDelete, onEdit) {
  onDelete = () => {
    alert(" Prepare to be terminated");
  };
  onEdit = () => {
    alert(" Prepare to be terminated");
  };
  return (
    <div>
      <form onSubmit={onEdit}>
        <label>
          <span>Name</span>
          <input name="name" value={props.user.name} />
        </label>
        <label>
          <span>Email</span>
          <input name="email" value={props.user.email} />
        </label>
        <label>
          <span>Password</span>
          <input name="password" value={props.user.password} />
        </label>
        <button onClick={onEdit}>Edit User</button>
      </form>
      <button onClick={onDelete}>Delete User</button>
    </div>
  );
}

export default Profile;
