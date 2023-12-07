import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkRemoveFromBytestream } from "../../../store/bytestream_members";

function LeaveBytestreamModal({ idToDelete }) {
   const dispatch = useDispatch();
   const { push } = useHistory();
   const { closeModal } = useModal();

   const leaveBytestream = () => {
      dispatch(thunkRemoveFromBytestream(idToDelete));
      return closeModal();
   };
   return (
      <div>
         <h2>Are you sure you want to leave this Bytestream</h2>
         <h4>This action cannot be reversed.</h4>
         <button onClick={leaveBytestream}>Yes</button>
         <button onClick={() => closeModal()}>No</button>
      </div>
   );
}

export default LeaveBytestreamModal;