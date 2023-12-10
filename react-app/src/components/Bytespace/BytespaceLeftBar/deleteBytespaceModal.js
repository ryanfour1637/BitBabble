import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteBytespace } from "../../../store/bytespace";
import "./delete.css";

function DeleteBytespaceModal({ bytespaceId }) {
   const dispatch = useDispatch();
   const { push } = useHistory();
   const { closeModal } = useModal();

   const deleteBytespace = async () => {
      await dispatch(thunkDeleteBytespace(bytespaceId));
      closeModal();
      push("/");
   };

   return (
      <div className="delete-outerdiv">
         <h2>Are you sure you want to delete your Bytespace?</h2>
         <h4>This action cannot be reversed.</h4>
         <div className="delete-button-div">
            <button onClick={deleteBytespace}>Yes</button>
            <button onClick={() => closeModal()}>No</button>
         </div>
      </div>
   );
}

export default DeleteBytespaceModal;
