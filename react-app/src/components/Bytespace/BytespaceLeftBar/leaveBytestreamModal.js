import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkRemoveFromBytestream } from "../../../store/bytestream_members";
import { thunkGetAllBytestreamMembers } from "../../../store/bytestream_members";

function LeaveBytestreamModal({
   idToDelete,
   socket,
   setBytestreamId,
   bytestreamId,
   user,
}) {
   const dispatch = useDispatch();
   const { push } = useHistory();
   const { closeModal } = useModal();

   const leaveBytestream = () => {
      if (!socket) return;
      dispatch(thunkRemoveFromBytestream(idToDelete));

      socket.emit("leave_room", { bytestream_id: idToDelete });

      dispatch(thunkGetAllBytestreamMembers());
      const notification = {
         bytestreamId: bytestreamId,
         message: `${user.username} has left the room`,
         system: true,
      };
      socket.emit("ws_send_message", notification);

      setBytestreamId(null);
      closeModal();
   };

   return (
      <div className="delete-outerdiv">
         <h2>Are you sure you want to leave this Bytestream</h2>
         <h4>This action cannot be reversed.</h4>
         <div className="delete-button-div">
            <button onClick={leaveBytestream}>Yes</button>
            <button onClick={() => closeModal()}>No</button>
         </div>
      </div>
   );
}

export default LeaveBytestreamModal;
