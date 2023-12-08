import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import ByteSpaceLeftBar from "./BytespaceLeftBar";
import BytestreamNameDropdown from "./BytespaceLeftBar/bytestreamDropDown";
import BytespaceNameDropdown from "./BytespaceLeftBar/nameDropDown";
import Navigation from "../Navigation";
import addmessage from "../../images/addmessage.png";
import "./singlebytespace.css";

function SingleBytespaceLandingPage() {
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
               <img
                  src={addmessage}
                  alt="add message"
                  className="addmessagebutton"
                  onClick={handleMessageClick}
               />
            </div>
            <BytestreamNameDropdown />
         </div>
         <div>Placeholder for future messages</div>
      </div>
   );
}

export default SingleBytespaceLandingPage;
