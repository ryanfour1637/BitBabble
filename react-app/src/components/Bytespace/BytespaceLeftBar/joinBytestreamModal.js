import React, { useState, useEffect } from "react";
import { login } from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import {
   thunkGetAllBytestreamMembers,
   thunkAddToBytestream,
} from "../../../store/bytestream_members";
import { useModal } from "../../../context/Modal";
import { useHistory, useParams } from "react-router-dom";
import { string } from "prop-types";

function JoinBytestreamModal({
   bytespaceBytestreamsArr,
   bytestreamMembershipRosters,
   userId,
   bytespaceId,
}) {
   const dispatch = useDispatch();
   console.log("🚀 ~ file: joinBytestreamModal.js:17 ~ userId:", userId);
   const { push } = useHistory();
   const { closeModal } = useModal();
   const [errors, setErrors] = useState([]);
   const [selectedValue, setSelectedValue] = useState("");
   const [selectedId, setSelectedId] = useState(null);

   const bytestreamMembershipRostersArr = Object.entries(
      bytestreamMembershipRosters
   );
   console.log(
      "🚀 ~ file: joinBytestreamModal.js:29 ~ bytestreamMembershipRostersArr:",
      bytestreamMembershipRostersArr
   );

   // i need to figure out why the bytestreamIds i am getting do not match. It could be something to do with the shape of my store or the way I am getting the data out of the store.

   const nonJoinedBytestreamArr = [];

   for (let rosterData of bytestreamMembershipRostersArr) {
      const [bytestreamId, roster] = rosterData;
      if (!Object.keys(roster).includes(userId.toString())) {
         nonJoinedBytestreamArr.push(bytestreamId);
      }
   }
   console.log(
      "🚀 ~ file: joinBytestreamModal.js:42 ~ nonJoinedBytestreamArr:",
      nonJoinedBytestreamArr
   );
   const bytestreamsToDisplay = [];

   for (let bytestream of bytespaceBytestreamsArr) {
      if (nonJoinedBytestreamArr.includes(bytestream.id.toString())) {
         bytestreamsToDisplay.push(bytestream);
      }
   }

   console.log(
      "🚀 ~ file: joinBytestreamModal.js:55 ~ JoinBytestreamModal ~ bytestreamsToDisplay:",
      bytestreamsToDisplay
   );

   const selectedBytestream = bytespaceBytestreamsArr.find(
      (bytestream) => bytestream.id == selectedId
   );
   console.log(
      "🚀 ~ file: joinBytestreamModal.js:75 ~ selectedBytestream:",
      selectedBytestream
   );
   const valueChange = (e) => {
      setSelectedId(e.target.value);
      setSelectedValue(selectedBytestream);
   };

   const joinBytestream = () => {
      dispatch(thunkAddToBytestream(selectedId));
      closeModal();
      push("/bytespaces");
   };

   return (
      <div>
         <h1>Join Bytestreams</h1>
         <select value={selectedValue} onChange={valueChange}>
            <option value="">Select a bytestream</option>
            {bytestreamsToDisplay.map((bytestream) => (
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
