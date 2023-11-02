import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BytespaceNameDropdown from "./nameDropDown";

function ByteSpaceLeftBar() {
   const dispatch = useDispatch();
   const user = useSelector((state) => state.session.user);
   const bytespaces = useSelector((state) => state.bytespace.bytespaces);
   const bytespacesArr = Object.values(bytespaces);
   const userBytespaceArr = bytespacesArr.filter(
      (bytespace) => bytespace.ownerId == user.id
   );

   // placeholder to pull all channels
   //placeholder to pull all threads
   //placeholder to pull all dms

   if (user == undefined) return null;
   if (!userBytespaceArr) return null;

   return (
      <div>
         <div>
            <BytespaceNameDropdown userBytespaceArr={userBytespaceArr} />
         </div>
         <div>
            Placeholder for channels dropdown which will hold all of the channel
            names you have joined
         </div>
      </div>
   );
}

export default ByteSpaceLeftBar;
