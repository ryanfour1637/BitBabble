import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkDeleteBytestream } from "../../../store/bytestream";
import { thunkGetAllBytestreams } from "../../../store/bytestream";
import { actionDeleteBytestreamMessages } from "../../../store/messages";
import "./delete.css";

function DeleteBytestreamModal({ bytestream, setBytestreamId, deleteCSS }) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();

   const deleteBytestream = async () => {
      await dispatch(thunkDeleteBytestream(bytestream));
      await dispatch(thunkGetAllBytestreams());
      await dispatch(actionDeleteBytestreamMessages(bytestream.id));
      setBytestreamId(null);
      return closeModal();
   };

   return (
      <div className={deleteCSS}>
         <h2>Delete your channel?</h2>
         <h4>This action cannot be reversed.</h4>
         <div className="delete-button-div">
            <button onClick={deleteBytestream}>Yes</button>
            <button onClick={() => closeModal()}>No</button>
         </div>
      </div>
   );
}

export default DeleteBytestreamModal;
