import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkUpdateBytespace } from "../../../store/bytespace";

function UpdateBytespaceModal({ bytespaceObj }) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();
   const [name, setName] = useState(bytespaceObj.name);

   const updateBytespace = async () => {
      const errors = await dispatch(
         thunkUpdateBytespace({ name: name }, bytespaceObj.id)
      );

      if (!errors) {
         closeModal();
      } else {
         //placeholder to set errors
      }
   };
   return (
      <div>
         <h1>Update your Bytespace</h1>
         <label>
            Bytespace Name
            <input
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
            ></input>
         </label>
         <button onClick={updateBytespace} disabled={name.length < 6}>
            Update Bytespace
         </button>
      </div>
   );
}

export default UpdateBytespaceModal;
