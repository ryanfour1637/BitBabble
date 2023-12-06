import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkUpdateBytestream } from "../../../store/bytestream";

function UpdateBytestreamModal({ bytestream }) {
   console.log(
      "🚀 ~ file: updateBytestreamModal.js:7 ~ UpdateBytestreamModal ~ bytestream :",
      bytestream
   );
   const dispatch = useDispatch();
   const { closeModal } = useModal();
   const [name, setName] = useState(bytestream.name);

   const updateBytestream = async () => {
      const errors = await dispatch(
         thunkUpdateBytestream({ name: name }, bytestream.id)
      );

      if (!errors) {
         closeModal();
      } else {
         //placeholder to set errors
      }
   };
   return (
      <div>
         <h1>Update your Bytestream</h1>
         <label>
            Bytestream Name
            <input
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
            ></input>
         </label>
         <button onClick={updateBytestream} disabled={name.length < 6}>
            Update Bytestream
         </button>
      </div>
   );
}

export default UpdateBytestreamModal;
