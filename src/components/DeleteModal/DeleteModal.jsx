import React, { Component } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteUser = async (evt) => {
    evt.preventDefault();
    try {
      console.log("DeleteUserCalled", props);
      const fetchResponse = await fetch(`/api/users/${props.user_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
      if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");
      let deleted_user = await fetchResponse.json();
      console.log("deleted user", deleted_user);
      if (deleted_user._id === props.user_id)
        console.log("App User State updated");
      props.setUserInState("");
      handleClose();
      window.location.reload(true);
    } catch (err) {
      console.log("Edit Form error", err);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Delete User
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete User
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to be terminated?
          </Typography>
          <Button onClick={handleClose}> Disagree</Button>
          <Button onClick={deleteUser}>Agree</Button>
        </Box>
      </Modal>
    </div>
  );
}
