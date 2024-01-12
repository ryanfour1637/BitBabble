import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import logouticon from "../../images/personicon.png";
import { useHistory } from "react-router-dom";

function ProfileButton({ user, logoutClass }) {
   const dispatch = useDispatch();
   const { push } = useHistory();
   const [logoutCSSClass, setLogoutCSSClass] = useState(logoutClass);

   const handleLogout = async (e) => {
      e.preventDefault();
      await dispatch(logout());
      push("/");
   };

   return (
      <>
         <img
            src={logouticon}
            onClick={handleLogout}
            className={logoutCSSClass}
            alt="logout"
         />
      </>
   );
}

export default ProfileButton;
