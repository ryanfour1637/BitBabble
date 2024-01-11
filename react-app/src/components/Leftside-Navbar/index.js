import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ByteSpaceDropdown from "./bytespaceButton";

function LeftsideNav({
   closeChannelDropdown,
   showNavDropdown,
   setShowNavDropdown,
   setShowWorkspaceDropdown,
}) {
   // const sessionUser = useSelector((state) => state.session.user);

   return (
      <>
         <ByteSpaceDropdown
            closeChannelDropdown={closeChannelDropdown}
            showNavDropdown={showNavDropdown}
            setShowNavDropdown={setShowNavDropdown}
            setShowWorkspaceDropdown={setShowWorkspaceDropdown}
         />
      </>
   );
}

export default LeftsideNav;
