import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllBytespaces } from "../../store/bytespace";
import { thunkAddToBytespace } from "../../store/bytespace_members";
import { useModal } from "../../context/Modal";

function JoinBytespaceModal() {
   const dispatch = useDispatch();
   const bytespaces = useSelector((state) => state.bytespace.bytespaces);
   const { closeModal } = useModal();
   const [errors, setErrors] = useState([]);
   const [selectedValue, setSelectedValue] = useState("");
   const [selectedId, setSelectedId] = useState(null);
   const bytespacesArr = Object.values(bytespaces);

   // need to filter out bytespaces which a particular user is already a part of so that they cannot be added to it a second time.
   // const bytespacesToDisplay =
   const selectedBytespace = bytespacesArr.find(
      (bytespace) => bytespace.id == selectedId
   );

   useEffect(() => {
      dispatch(thunkGetAllBytespaces());
   }, [dispatch]);

   const valueChange = (e) => {
      setSelectedId(e.target.value);
      setSelectedValue(selectedBytespace);
   };

   const joinBytespace = () => {
      console.log("onclick", selectedId);
      dispatch(thunkAddToBytespace(selectedId));
   };

   return (
      <div>
         <h1>Join Bytespaces</h1>
         <select value={selectedValue} onChange={valueChange}>
            <option value="">Select a bytespace</option>
            {bytespacesArr.map((bytespace) => (
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
