import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateBytespace } from "../../store/bytespace";
import { thunkAddToBytespace } from "../../store/bytespace_members";
import { useHistory } from "react-router-dom";

function CreateBytespaceModal({ userId }) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();
   const { push } = useHistory();
   const [name, setName] = useState("");

   const createBytespace = async () => {
      const id = await dispatch(thunkCreateBytespace({ name: name }));
      await dispatch(thunkAddToBytespace(id));
      closeModal();
   };

   return (
      <div>
         <h1>Create a Bytespace</h1>
         <label>
            Bytespace Name
            <input
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
            ></input>
         </label>
         <button onClick={createBytespace} disabled={name.length < 6}>
            Create Bytespace
         </button>
      </div>
   );
}

export default CreateBytespaceModal;
