import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkUpdateBytestream } from "../../../store/bytestream";

function UpdateBytestreamModal({
   bytestreamId,
   bytestreamName,
   setBytestreamName,
}) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();
   const [name, setName] = useState(bytestreamName);
   const [errors, setErrors] = useState("");

   const updateBytestream = async () => {
      const errors = await dispatch(
         thunkUpdateBytestream({ name: name }, bytestreamId)
      );

      if (errors === null) {
         setBytestreamName(name);
         closeModal();
      } else {
         setErrors(errors.errors);
      }
   };
   return (
      <div className="createbytespace-outerdiv">
         <div>
            <h1>Update your channel</h1>
            <p className="createbytespace-errors">{errors}</p>
         </div>
         <label className="createbytespace-label">
            <div className="createbytespace-label-div">
               <h4>Update Channel name:</h4>
               {name.length < 6 || name.length > 25 ? (
                  <p className="createbytespace-label-errors">
                     Must be between 6-25 characters
                  </p>
               ) : null}
            </div>
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
            Update Channel
         </button>
      </div>
   );
}

export default UpdateBytestreamModal;
