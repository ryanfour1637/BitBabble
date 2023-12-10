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
   const [errors, setErrors] = useState("");

   const updateBytestream = async () => {
      const errors = await dispatch(
         thunkUpdateBytestream({ name: name }, bytestream.id)
      );

      if (!errors) {
         closeModal();
      } else {
         setErrors(errors.errors);
      }
   };
   return (
      <div className="createbytespace-outerdiv">
         <h1>Update your Bytestream</h1>
         <p className="createbytespace-errors">{errors}</p>
         <label className="createbytespace-label">
            Bytestream Name
            <input
               className="createbytespace-input"
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
            ></input>
         </label>
         <button
            className="createbytespace-button"
            onClick={updateBytestream}
            disabled={name.length < 6}
         >
            Update Bytestream
         </button>
      </div>
   );
}

export default UpdateBytestreamModal;
