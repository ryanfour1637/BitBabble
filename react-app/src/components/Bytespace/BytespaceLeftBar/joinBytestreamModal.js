import React, { useState, useEffect } from "react";
import { login } from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllBytestreams } from "../../../store/bytestream";
import {
   thunkGetAllBytestreamMembers,
   thunkAddToBytestream,
} from "../../../store/bytestream_members";
import { useModal } from "../../../context/Modal";
import { useHistory, useParams } from "react-router-dom";

function JoinBytestreamModal() {
   const dispatch = useDispatch();
   const { userId, bytespaceId } = useParams();
   const { push } = useHistory();
   const { closeModal } = useModal();
   const [errors, setErrors] = useState([]);
   const [selectedValue, setSelectedValue] = useState("");
   const [selectedId, setSelectedId] = useState(null);
   const bytestreams = useSelector((state) => state.bytestreams);
   const bytestreamMembershipRosters = useSelector(
      (state) => state.bytestreamMembers
   );

   useEffect(() => {
      dispatch(thunkGetAllBytestreams);
      dispatch(thunkGetAllBytestreamMembers);
   }, [dispatch]);

   if (bytestreams == undefined || Object.values(bytestreams).length === 0)
      return null;

   if (
      bytestreamMembershipRosters == undefined ||
      Object.entries(bytestreamMembershipRosters).length === 0
   )
      return null;

   const bytespaceBytestreams = bytestreams[bytespaceId];

   const bytestreamMembershipRostersArr = Object.entries(
      bytestreamMembershipRosters
   );

   const nonJoinedBytestreamArr = [];

   for (let rosterData of bytestreamMembershipRostersArr) {
      const [bytestreamId, roster] = rosterData;
      if (!Object.keys(roster).includes(userId.toString())) {
         nonJoinedBytestreamArr.push(bytestreamId);
      }
   }

   const bytestreamsToDisplay = [];

   console.log(
      "🚀 ~ file: joinBytestreamModal.js:57 ~ JoinBytestreamModal ~ bytespaceBytestreams:",
      bytespaceBytestreams
   );

   for (let bytestream of bytespaceBytestreams) {
      if (nonJoinedBytestreamArr.includes(bytestream.id.toString())) {
         bytestreamsToDisplay.push(bytestream);
      }
   }

   console.log(
      "🚀 ~ file: joinBytestreamModal.js:55 ~ JoinBytestreamModal ~ bytestreamsToDisplay:",
      bytestreamsToDisplay
   );

   const selectedBytestream = bytespaceBytestreams.find(
      (bytestream) => bytestream.id == selectedId
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
