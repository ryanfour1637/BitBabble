import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ByteSpaceDropdown from "./bytespaceButton";

function LeftsideNav() {
   // const sessionUser = useSelector((state) => state.session.user);

   return (
      <>
         <ByteSpaceDropdown />
      </>
   );
}

export default LeftsideNav;
