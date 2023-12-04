import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllBytespaces } from "../../store/bytespace";
import { thunkAddToBytespace } from "../../store/bytespace_members";
import { thunkGetAllMembers } from "../../store/bytespace_members";
import { useModal } from "../../context/Modal";

function JoinBytespaceModal() {
   const dispatch = useDispatch();
   const bytespaces = useSelector((state) => state.bytespace.bytespaces);
   const bytespacesMembershipRosters = useSelector(
      (state) => state.bytespaceMembers
   );
   const user = useSelector((state) => state.session.user);
   const { closeModal } = useModal();
   const [errors, setErrors] = useState([]);
   const [selectedValue, setSelectedValue] = useState("");
   const [selectedId, setSelectedId] = useState(null);
   const bytespacesArr = Object.values(bytespaces);

   const bytespacesMembershipRostersArr = Object.entries(
      bytespacesMembershipRosters
   );

   const nonJoinedBytespaceArr = [];

   for (let rosterData of bytespacesMembershipRostersArr) {
      const [bytespaceId, roster] = rosterData;

      if (!Object.keys(roster).includes(user.id.toString())) {
         nonJoinedBytespaceArr.push(bytespaceId);
      }
   }

   const bytespacesToDisplay = [];

   for (let bytespace of bytespacesArr) {
      if (nonJoinedBytespaceArr.includes(bytespace.id.toString())) {
         bytespacesToDisplay.push(bytespace);
      }
   }

   const selectedBytespace = bytespacesArr.find(
      (bytespace) => bytespace.id == selectedId
   );

   useEffect(() => {
      dispatch(thunkGetAllBytespaces());
      dispatch(thunkGetAllMembers());
   }, [dispatch]);

   const valueChange = (e) => {
      setSelectedId(e.target.value);
      setSelectedValue(selectedBytespace);
   };

   const joinBytespace = () => {
      dispatch(thunkAddToBytespace(selectedId));
      closeModal();
      
   };

   return (
      <div>
         <h1>Join Bytespaces</h1>
         <select value={selectedValue} onChange={valueChange}>
            <option value="">Select a bytespace</option>
            {bytespacesToDisplay.map((bytespace) => (
               <option key={bytespace.id} value={bytespace.id}>
                  {bytespace.name}
               </option>
            ))}
         </select>
         <button onClick={joinBytespace} disabled={selectedValue == ""}>
            Join Bytespace
         </button>
      </div>
   );
}

export default JoinBytespaceModal;
