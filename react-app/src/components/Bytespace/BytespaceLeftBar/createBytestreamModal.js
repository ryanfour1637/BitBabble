import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkCreateBytestream } from "../../../store/bytestream";
import { thunkAddToBytestream } from "../../../store/bytestream_members";
import { useHistory } from "react-router-dom";

function CreateBytestreamModal({ bytespaceId, socket, setBytestreamId }) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();
   const { push } = useHistory();
   const [name, setName] = useState("");
   const [errors, setErrors] = useState("");

   const createBytestream = async () => {
      const errors = await dispatch(
         thunkCreateBytestream({ name: name }, bytespaceId)
      );

      if (typeof errors == "number") {
         if (!socket) return;
         await dispatch(thunkAddToBytestream(errors, bytespaceId));
         socket.emit("join_room", { bytestream_id: errors });
         setBytestreamId(errors);
         closeModal();
      } else {
         setErrors(errors.errors);
      }
   };

   return (
      <div className="createbytespace-outerdiv">
         <div>
            <h1>Create a Bytestream</h1>
            <p className="createbytespace-errors">{errors}</p>
         </div>
         <label className="createbytespace-label">
            <div className="createbytespace-label-div">
               <h4>Bytestream Name:</h4>
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
            onClick={createBytestream}
            disabled={name.length < 6 || name.length > 25}
         >
            Create Bytestream
         </button>
      </div>
   );
}

export default CreateBytestreamModal;
