import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkCreateBytestream } from "../../../store/bytestream";
import { thunkAddToBytestream } from "../../../store/bytestream_members";

function CreateBytestreamModal({
   bytespaceId,
   socket,
   setBytestreamId,
   setBytestreamName,
   setBytestream,
   setActiveBytestream,
   setIsChannelOpen,
   toggleChannelsDropdown,
   isOpen,
   setChannelMemberId,
}) {
   const dispatch = useDispatch();
   const { closeModal } = useModal();
   const [name, setName] = useState("");
   const [errors, setErrors] = useState("");

   const createBytestream = async () => {
      const channel = await dispatch(
         thunkCreateBytestream({ name: name }, bytespaceId)
      );

      if (typeof channel.id == "number") {
         if (!socket) return;
         const memberId = await dispatch(
            thunkAddToBytestream(channel.id, bytespaceId)
         );
         socket.emit("join_room", { bytestream_id: channel.id });
         setBytestreamId(channel.id);
         setActiveBytestream(channel.id);
         setBytestreamName(name);
         setBytestream(channel);
         setIsChannelOpen(false);
         setChannelMemberId(memberId);

         if (isOpen) {
            return closeModal();
         } else {
            toggleChannelsDropdown();
            return closeModal();
         }
      } else {
         setErrors(channel.errors);
      }
   };

   return (
      <div className="createbytespace-outerdiv">
         <div>
            <h1>Create a channel</h1>
            <p className="createbytespace-errors">{errors}</p>
         </div>
         <label className="createbytespace-label">
            <div className="createbytespace-label-div">
               <h4>Channel Name:</h4>
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
            Create Channel
         </button>
      </div>
   );
}

export default CreateBytestreamModal;
