import React, { useState } from "react";
import BytestreamNameDropdown from "./BytespaceLeftBar/bytestreamDropDown";
import BytespaceNameDropdown from "./BytespaceLeftBar/nameDropDown";
import BytestreamChatRoom from "./BytespaceLeftBar/bytestreamChatRoom";
import { useWebSocket } from "../../context/webSocket";
import Navigation from "../Navigation";
import addmessage from "../../images/addmessage.png";
import "./singlebytespace.css";

function SingleBytespaceLandingPage({ user }) {
   const [bytestreamId, setBytestreamId] = useState(null);
   const socket = useWebSocket();

   const handleMessageClick = () => {
      alert("Feature coming soon!");
   };

   return (
      <div className="single-bytespace-outerdiv">
         <div>
            <Navigation />
         </div>
         <div className="bytespace-leftbar">
            <div className="bytespace-leftbar-topdiv">
               <BytespaceNameDropdown />
            </div>
            <BytestreamNameDropdown
               setBytestreamId={setBytestreamId}
               socket={socket}
            />
         </div>
         <div className="bytespace-messagesdiv">
            <BytestreamChatRoom bytestreamId={bytestreamId} socket={socket} />
         </div>
      </div>
   );
}

export default SingleBytespaceLandingPage;
