import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import BytestreamNameDropdown from "./BytespaceLeftBar/bytestreamDropDown";
import BytespaceNameDropdown from "./BytespaceLeftBar/nameDropDown";
import BytestreamChatRoom from "./BytespaceLeftBar/bytestreamChatRoom";
import { thunkGetOneBytestreamsMessages } from "../../store/messages";
import { WebSocketProvider } from "../../context/webSocket";
import Navigation from "../Navigation";
import addmessage from "../../images/addmessage.png";
import "./singlebytespace.css";

function SingleBytespaceLandingPage({ user }) {
   const dispatch = useDispatch();
   const [bytestreamId, setBytestreamId] = useState(null);
   const messages = useSelector((state) => state.messages);
   const handleMessageClick = () => {
      alert("Feature coming soon!");
   };
   console.log(
      "🚀 ~ file: index.js:16 ~ SingleBytespaceLandingPage ~ messages:",
      messages
   );

   useEffect(() => {
      dispatch(thunkGetOneBytestreamsMessages());
   }, [dispatch]);

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
            <div className="bytespace-messagesdiv">
               <WebSocketProvider user={user}>
                  <BytestreamChatRoom
                     messages={messages}
                     bytestreamId={bytestreamId}
                  />
               </WebSocketProvider>
            </div>
         )}
      </div>
   );
}

export default SingleBytespaceLandingPage;
