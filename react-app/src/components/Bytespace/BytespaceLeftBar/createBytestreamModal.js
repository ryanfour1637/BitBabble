import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkCreateBytestream } from "../../../store/bytestream";
import { useHistory } from "react-router-dom";

function CreateBytestreamModal({ bytespaceId }) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();
   const { push } = useHistory();
   const [name, setName] = useState("");

   const createBytestream = () => {
      dispatch(thunkCreateBytestream({ name: name }, bytespaceId));
      closeModal();
   };

   return (
      <div>
         <h1>Create a Bytestream</h1>
         <label>
            Bytestream Name
            <input
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
            ></input>
         </label>
         <button onClick={createBytestream} disabled={name.length < 6}>
            Create Bytestream
         </button>
      </div>
   );
}

export default CreateBytestreamModal;
