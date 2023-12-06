import React, { useState, useEffect } from "react";
import { login } from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddToBytestream } from "../../../store/bytestream_members";
import { useModal } from "../../../context/Modal";
import { useHistory, useParams } from "react-router-dom";

function JoinBytestreamModal({ nonJoinedBytestreamsToDisplay, bytespaceId }) {
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
      closeModal();
   };

   return (
      <div>
         <h1>Join Bytestreams</h1>
         <select value={selectedValue} onChange={valueChange}>
            <option value="">Select a bytestream</option>
            {nonJoinedBytestreamsToDisplay.map((bytestream) => (
               <option key={bytestream.id} value={bytestream.id}>
                  {bytestream.name}
               </option>
            ))}
         </select>
         <button onClick={joinBytestream} disabled={selectedValue == ""}>
            Join Bytestream
         </button>
      </div>
   );
}

export default JoinBytestreamModal;
