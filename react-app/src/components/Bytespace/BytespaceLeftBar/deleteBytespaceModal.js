import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteBytespace } from "../../../store/bytespace";

function DeleteBytespaceModal({ bytespaceId }) {
   const dispatch = useDispatch();
   const { push } = useHistory();
   const { closeModal } = useModal();

   const deleteBytespace = async () => {
      await dispatch(thunkDeleteBytespace(bytespaceId));
      closeModal();
      push("/bytespaces");
   };

   return (
      <div>
         <h2>Are you sure you want to delete your Bytespace</h2>
         <h4>This action cannot be reversed.</h4>
         <button onClick={deleteBytespace}>Yes</button>
         <button onClick={() => closeModal()}>No</button>
      </div>
   );
}

export default DeleteBytespaceModal;
