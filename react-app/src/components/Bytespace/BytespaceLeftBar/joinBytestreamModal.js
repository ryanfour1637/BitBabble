import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkAddToBytestream } from "../../../store/bytestream_members";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";

function JoinBytestreamModal({
   nonJoinedBytestreamsToDisplay,
   bytespaceId,
   socket,
   setBytestreamId,
   setBytestreamName,
   setChannelMemberId,
   setActiveBytestream,
   setIsChannelOpen,
   toggleChannelsDropdown,
}) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();
   const [selectedValue, setSelectedValue] = useState("");
   const [selectedId, setSelectedId] = useState(null);
   const selectedBytestream = nonJoinedBytestreamsToDisplay.find(
      (bytestream) => bytestream.id == selectedId
   );

   const valueChange = (e) => {
      setSelectedId(e.target.value);
      setSelectedValue(selectedBytestream);
   };

   const joinBytestream = async () => {
      if (!socket) return;
      const memberId = await dispatch(
         thunkAddToBytestream(selectedId, bytespaceId)
      );
      socket.emit("join_room", { bytestream_id: selectedId });
      setBytestreamId(selectedId);
      setActiveBytestream(selectedId);
      setBytestreamName(selectedBytestream.name);
      setChannelMemberId(memberId);
      setIsChannelOpen(false);
      toggleChannelsDropdown();
      closeModal();
   };

   return (
      <div className="joinbytespace-outerdiv">
         <h1>Join channels</h1>
         <label className="joinbytespace-label">
            Choose a Channel:
            <select
               className="joinbytespace-input"
               value={selectedValue}
               onChange={valueChange}
            >
               <option value="">Select a channel</option>
               {nonJoinedBytestreamsToDisplay.map((bytestream) => (
                  <option key={bytestream.id} value={bytestream.id}>
                     {bytestream.name}
                  </option>
               ))}
            </select>
         </label>
         <button
            className="joinbytespace-button"
            onClick={joinBytestream}
            disabled={selectedValue == ""}
         >
            Join Channel
         </button>
      </div>
   );
}

export default JoinBytestreamModal;
