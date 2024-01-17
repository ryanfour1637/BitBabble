import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkUpdateBytespace } from "../../../store/bytespace";
import "../../Leftside-Navbar/createBytespace.css";

function UpdateBytespaceModal({ bytespaceObj }) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();
   const [name, setName] = useState(bytespaceObj.name);
   const [errors, setErrors] = useState("");

   const updateBytespace = async () => {
      const errors = await dispatch(
         thunkUpdateBytespace({ name: name }, bytespaceObj.id)
      );

      if (!errors) {
         closeModal();
      } else {
         setErrors(errors.errors);
      }
   };
   return (
      <div className="createbytespace-outerdiv">
         <div>
            <h1>Update your workspace</h1>
            <p className="createbytespace-errors">{errors}</p>
         </div>
         <label className="createbytespace-label">
            <div className="createbytespace-label-div">
               <h4>Update Workspace name:</h4>
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
            onClick={updateBytespace}
            disabled={name.length < 6 || name.length > 25}
         >
            Update Workspace
         </button>
      </div>
   );
}

export default UpdateBytespaceModal;
