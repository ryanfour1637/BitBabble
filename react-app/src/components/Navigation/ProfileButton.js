import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import logouticon from "../../images/personicon.png";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
   const dispatch = useDispatch();
   const { push } = useHistory();

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
            className="personicon"
            alt="logout"
         />
      </>
   );
}

export default ProfileButton;
