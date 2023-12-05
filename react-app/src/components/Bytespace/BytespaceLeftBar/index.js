import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BytespaceNameDropdown from "./nameDropDown";
import BytestreamNameDropdown from "./bytestreamDropDown";

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
            <BytestreamNameDropdown />
         </div>
      </div>
   );
}

export default ByteSpaceLeftBar;
