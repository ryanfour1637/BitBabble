import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { thunkAddToBytestream } from "../../../store/bytestream_members";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";

function JoinBytestreamModal({
   nonJoinedBytestreamsToDisplay,
   bytespaceId,
   socket,
}) {
   const dispatch = useDispatch();

   const { push } = useHistory();
   const { closeModal } = useModal();
   const [errors, setErrors] = useState([]);
   const [selectedValue, setSelectedValue] = useState("");
   const [selectedId, setSelectedId] = useState(null);

   const selectedBytestream = nonJoinedBytestreamsToDisplay.find(
      (bytestream) => bytestream.id == selectedId
   );

   const valueChange = (e) => {
      setSelectedId(e.target.value);
      setSelectedValue(selectedBytestream);
   };

   const joinBytestream = () => {
      dispatch(thunkAddToBytestream(selectedId, bytespaceId));
      console.log("socket connected?", socket.connected);
      socket.emit("join_room", { bytestream_id: selectedId });
      console.log("joined room");
      closeModal();
   };

   return (
      <div className="joinbytespace-outerdiv">
         <h1>Join Bytestreams</h1>
         <label className="joinbytespace-label">
            Choose a Bytestream:
            <select
               className="joinbytespace-input"
               value={selectedValue}
               onChange={valueChange}
            >
               <option value="">Select a bytestream</option>
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
            Join Bytestream
         </button>
      </div>
   );
}

export default JoinBytestreamModal;
