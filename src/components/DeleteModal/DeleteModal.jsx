// import React, { Component } from "react";
// import M from "materialize-css";
// import "materialize-css/dist/css/materialize.min.css";

// class DeleteModal extends Component {
//   componentDidMount() {
//     const options = {
//       onOpenStart: () => {
//         console.log("Open Start");
//       },
//       onOpenEnd: () => {
//         console.log("Open End");
//       },
//       onCloseStart: () => {
//         console.log("Close Start");
//       },
//       onCloseEnd: () => {
//         console.log("Close End");
//       },
//       inDuration: 250,
//       outDuration: 250,
//       opacity: 0.5,
//       dismissible: false,
//       startingTop: "4%",
//       endingTop: "10%",
//     };
//     M.Modal.init(this.Modal, options);

//     // let instance = M.Modal.getInstance(this.Modal);
//     // instance.open();
//     // instance.close();
//     // instance.destroy();
//   }

//   deleteUser = async (evt) => {
//     evt.preventDefault();
//     try {
//       console.log("DeleteUserCalled", this.props);
//       const fetchResponse = await fetch(`/api/users/${this.props.user_id}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       });

//       // 2. Check "fetchResponse.ok". False means status code was 4xx from the server/controller action
//       if (!fetchResponse.ok) throw new Error("Fetch failed - Bad request");
//       let deleted_user = await fetchResponse.json();
//       console.log("deleted user", deleted_user);
//       if (deleted_user._id === this.props.user_id)
//         console.log("App User State updated");
//       this.props.setUserInState("");
//       window.location.reload(true);
//     } catch (err) {
//       console.log("Edit Form error", err);
//     }
//   };

//   handleClose = () => {
//     console.log("Delete Modal closed");
//   };

//   render() {
//     return (
//       <div>
//         <a
//           className="waves-effect waves-light btn modal-trigger"
//           data-target="modal1"
//         >
//           Delete User
//         </a>

//         <div
//           ref={(Modal) => {
//             this.Modal = Modal;
//           }}
//           id="modal1"
//           className="modal"
//         >
//           <div className="modal-content">
//             <h4>Delete User</h4>
//             <p>Are you sure you want to be terminated? </p>
//           </div>
//           <div className="modal-footer">
//             <a
//               className="modal-close waves-effect waves-red btn-flat"
//               onClick={this.handleClose}
//             >
//               Disagree
//             </a>
//             <a
//               className="modal-close waves-effect waves-green btn-flat"
//               onClick={this.deleteUser}
//             >
//               Agree
//             </a>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default DeleteModal;
