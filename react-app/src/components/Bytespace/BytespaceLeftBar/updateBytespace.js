import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
         <h1>Update your Bytespace</h1>
         <p className="createbytespace-errors">{errors}</p>
         <label className="createbytespace-label">
            Bytespace Name: Must be between 6-25 characters
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
            Update Bytespace
         </button>
      </div>
   );
}

export default UpdateBytespaceModal;
