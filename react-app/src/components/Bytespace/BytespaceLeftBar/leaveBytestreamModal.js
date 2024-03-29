import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkRemoveFromBytestream } from "../../../store/bytestream_members";
import { thunkGetAllBytestreamMembers } from "../../../store/bytestream_members";

function LeaveBytestreamModal({
   socket,
   setBytestreamId,
   bytestreamId,
   user,
   leaveCSS,
   channelMemberId,
}) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();

   const leaveBytestream = async () => {
      if (!socket) return;
      //this needs to be the bytesteram member id not bytestream id
      await dispatch(thunkRemoveFromBytestream(channelMemberId));

      await socket.emit("leave_room", { bytestream_id: bytestreamId });

      await dispatch(thunkGetAllBytestreamMembers());

      const notification = {
         // something in here seems to be the issues
         bytestreamId: bytestreamId,
         message: `${user.username} has left the room`,
         system: true,
      };
      await socket.emit("ws_send_message", notification);

      setBytestreamId(null);
      closeModal();
   };

   return (
      <div className={leaveCSS}>
         <h2>Are you sure you want to leave this channel?</h2>
         <h4>This action cannot be reversed.</h4>
         <div className="delete-button-div">
            <button onClick={leaveBytestream}>Yes</button>
            <button onClick={() => closeModal()}>No</button>
         </div>
      </div>
   );
}

export default LeaveBytestreamModal;
