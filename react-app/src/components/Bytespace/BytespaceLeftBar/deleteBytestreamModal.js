import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteBytestream } from "../../../store/bytestream";
import { thunkGetAllBytestreams } from "../../../store/bytestream";
import { thunkGetAllBytestreamMembers } from "../../../store/bytestream_members";

function DeleteBytestreamModal({ bytestream }) {
   const dispatch = useDispatch();
   const { push } = useHistory();
   const { closeModal } = useModal();

   const deleteBytestream = async () => {
      await dispatch(thunkDeleteBytestream(bytestream));
      await dispatch(thunkGetAllBytestreamMembers());
      return closeModal();
   };

   return (
      <div>
         <h2>Are you sure you want to delete your Bytestream</h2>
         <h4>This action cannot be reversed.</h4>
         <button onClick={deleteBytestream}>Yes</button>
         <button onClick={() => closeModal()}>No</button>
      </div>
   );
}

export default DeleteBytestreamModal;
