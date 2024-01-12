import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkRemoveFromBytespace } from "../../../store/bytespace_members";

function LeaveBytespaceModal({ idToDelete }) {
   const dispatch = useDispatch();
   const { push } = useHistory();
   const { closeModal } = useModal();

   const leaveBytespace = () => {
      dispatch(thunkRemoveFromBytespace(idToDelete));
      closeModal();
      return push("/");
   };
   return (
      <div className="delete-outerdiv">
         <h2>Are you sure you want to leave this Workspace</h2>
         <h4>This action cannot be reversed.</h4>

         <div className="delete-button-div">
            <button onClick={leaveBytespace}>Yes</button>
            <button onClick={() => closeModal()}>No</button>
         </div>
      </div>
   );
}

export default LeaveBytespaceModal;
