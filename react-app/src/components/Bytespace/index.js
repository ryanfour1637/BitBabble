import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import BytestreamNameDropdown from "./BytespaceLeftBar/bytestreamDropDown";
import BytespaceNameDropdown from "./BytespaceLeftBar/nameDropDown";
import BytestreamChatRoom from "./BytespaceLeftBar/bytestreamChatRoom";
import { thunkGetOneBytestreamsMessages } from "../../store/messages";
import Navigation from "../Navigation";
import addmessage from "../../images/addmessage.png";
import "./singlebytespace.css";

function SingleBytespaceLandingPage() {
   const dispatch = useDispatch();
   const [bytestreamId, setBytestreamId] = useState(null);
   const messages = useSelector((state) => state.messages);
   const handleMessageClick = () => {
      alert("Feature coming soon!");
   };

   useEffect(() => {
      if (bytestreamId) {
         dispatch(thunkGetOneBytestreamsMessages(bytestreamId));
      }
   }, [bytestreamId, dispatch]);

   
   return (
      <div className="single-bytespace-outerdiv">
         <div>
            <Navigation />
         </div>
         <div className="bytespace-leftbar">
            <div className="bytespace-leftbar-topdiv">
               <BytespaceNameDropdown />
               <img
                  src={addmessage}
                  alt="add message"
                  className="addmessagebutton"
                  onClick={handleMessageClick}
               />
            </div>
            <BytestreamNameDropdown setBytestreamId={setBytestreamId} />
         </div>
         {bytestreamId && (
            <div className="messages-div">
               <BytestreamChatRoom
                  message={messages}
                  bytestreamId={bytestreamId}
               />
            </div>
         )}
      </div>
   );
}

export default SingleBytespaceLandingPage;
