import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkRemoveFromBytespace } from "../../../store/bytespace_members";

function LeaveBytespaceModal({ idToDelete }) {
   const dispatch = useDispatch();
   const { push } = useHistory();
   const { closeModal } = useModal();

   const leaveBytespace = async () => {
      await dispatch(thunkRemoveFromBytespace(idToDelete));
      closeModal();
      push("/bytespaces");
   };
   return (
      <div>
         <h2>Are you sure you want to leave this Bytespace</h2>
         <h4>This action cannot be reversed.</h4>
         <button onClick={leaveBytespace}>Yes</button>
         <button onClick={() => closeModal()}>No</button>
      </div>
   );
}

export default LeaveBytespaceModal;
