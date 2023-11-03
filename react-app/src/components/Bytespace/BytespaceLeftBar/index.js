import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ByteSpaceLeftBar() {
   const dispatch = useDispatch();

   // placeholder to pull all channels
   //placeholder to pull all threads
   //placeholder to pull all dms

   return (
      <div>
         <div>
            <BytespaceNameDropdown />
         </div>
         <div>
            Placeholder for channels dropdown which will hold all of the channel
            names you have joined
         </div>
      </div>
   );
}

export default ByteSpaceLeftBar;
