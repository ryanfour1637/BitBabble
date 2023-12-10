import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateBytespace } from "../../store/bytespace";
import { thunkAddToBytespace } from "../../store/bytespace_members";
import { useHistory } from "react-router-dom";
import "./createBytespace.css";

function CreateBytespaceModal({ userId }) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();
   const { push } = useHistory();
   const [name, setName] = useState("");
   const [errors, setErrors] = useState("");

   const createBytespace = async () => {
      const errors = await dispatch(thunkCreateBytespace({ name: name }));
      console.log(
         "🚀 ~ file: createBytespaceModel.js:18 ~ createBytespace ~ errors:",
         errors
      );
      console.log("what is the type", typeof errors);

      if (typeof errors == "number") {
         await dispatch(thunkAddToBytespace(errors));
         closeModal();
         return push("/");
      } else {
         setErrors(errors.errors);
      }
   };

   return (
      <div className="createbytespace-outerdiv">
         <h1>Create a Bytespace</h1>
         <p className="createbytespace-errors">{errors}</p>

         <label className="createbytespace-label">
            Bytespace Name
            <input
               className="createbytespace-input"
               type="text"
               placeholder="Name must be between 6-25 characters"
               value={name}
               onChange={(e) => setName(e.target.value)}
            ></input>
         </label>
         <button
            className="createbytespace-button"
            onClick={createBytespace}
            disabled={name.length < 6 || name.length > 25}
         >
            Create Bytespace
         </button>
      </div>
   );
}

export default CreateBytespaceModal;
