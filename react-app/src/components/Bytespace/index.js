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

   return (
      <div className="container-fluid">
         <div className="nav justify-content-start flex-column">
            <Navigation />
         </div>
         <div className="bytespace-leftbar">
            <>
               <BytespaceNameDropdown />
            </>
            <BytestreamNameDropdown
               setBytestreamId={setBytestreamId}
               socket={socket}
               bytestreamId={bytestreamId}
               user={user}
            />
         </div>
         <div className="bytespace-messagesdiv">
            <BytestreamChatRoom
               bytestreamId={bytestreamId}
               socket={socket}
               user={user}
            />
         </div>
      </div>
   );
}

export default SingleBytespaceLandingPage;
