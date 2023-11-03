import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllBytespaces } from "../../store/bytespace";
import { useModal } from "../../context/Modal";

function JoinBytespaceModal() {
   const dispatch = useDispatch();
   const bytespaces = useSelector((state) => state.bytespace.bytespaces);
   const { closeModal } = useModal();
   const [errors, setErrors] = useState([]);
   const [selectedValue, setSelectedValue] = useState("");

   const bytespacesArr = Object.values(bytespaces);

   useEffect(() => {
      dispatch(thunkGetAllBytespaces());
   }, [dispatch]);

   const joinBytespace = () => {};

   return (
      <div>
         <h1>Join Bytespaces</h1>
         <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
         >
            <option value="">Select a bytespace</option>
            {bytespacesArr.map((bytespace) => (
               <option key={bytespace.id} value={bytespace.name}>
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
