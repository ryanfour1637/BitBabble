import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./delete.css";

function DeleteMessageModal({ messageId, socket }) {
   const { closeModal } = useModal();


   const deleteMessage = (e) => {
      e.preventDefault();
      socket.emit("ws_delete_message", messageId);
      closeModal();
   };

   return (
      <div className="delete-outerdiv">
         <h2>Delete your message?</h2>
         <h4>This action cannot be reversed.</h4>
         <div className="delete-button-div">
            <button onClick={deleteMessage}>Yes</button>
            <button onClick={() => closeModal()}>No</button>
         </div>
      </div>
   );
}

export default DeleteMessageModal;
