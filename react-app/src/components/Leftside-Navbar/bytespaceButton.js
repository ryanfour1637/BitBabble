import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import JoinBytespaceModal from "./joinBytespaceModal";
import CreateBytespaceModal from "./createBytespaceModel";
import logo from "../../images/logo.png";

function ByteSpaceDropdown() {
   const [showMenu, setShowMenu] = useState(false);
   const user = useSelector((state) => state.session.user);

   const ulRefBytespace = useRef();

   const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
   };

   useEffect(() => {
      if (!showMenu) return;

      const closeMenu = (e) => {
         if (!ulRefBytespace.current.contains(e.target)) {
            setShowMenu(false);
         }
      };

      document.addEventListener("click", closeMenu);

      return () => document.removeEventListener("click", closeMenu);
   }, [showMenu]);

   const ulClassNameBytespace =
      "profile-dropdown" + (showMenu ? "" : " hidden");
   const closeMenu = () => setShowMenu(false);

   return (
      <div>
         <button onClick={openMenu}>
            <img src={logo} alt="logo" id="logo" />
         </button>
         <ul className={ulClassNameBytespace} ref={ulRefBytespace}>
            <li>{"Placeholder for current space name"}</li>
            <li>{"Placeholder for links to other spaces"}</li>
            <li>
               <OpenModalButton
                  buttonText="Join new bytespace"
                  onItemClick={closeMenu}
                  modalComponent={<JoinBytespaceModal userId={user.id} />}
               />
            </li>
            <li>
               <OpenModalButton
                  buttonText="Create new bytespace"
                  onItemClick={closeMenu}
                  modalComponent={<CreateBytespaceModal userId={user.id} />}
               />
            </li>
         </ul>
      </div>
   );
}

export default ByteSpaceDropdown;
