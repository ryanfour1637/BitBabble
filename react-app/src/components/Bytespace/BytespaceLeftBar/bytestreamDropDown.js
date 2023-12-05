import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkGetAllBytestreams } from "../../../store/bytestream";

function BytestreamNameDropdown() {
   const dispatch = useDispatch();
   const [showMenu, setShowMenu] = useState(false);
   const { userId, bytespaceId } = useParams();

   const bytestreams = useSelector((state) => state.bytestreams);
   console.log(
      "🚀 ~ file: bytestreamDropDown.js:11 ~ BytestreamNameDropdown ~ bytestreams:",
      bytestreams
   );
   const ulRefAllBytestreams = useRef();

   const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
   };

   useEffect(() => {
      dispatch(thunkGetAllBytestreams());

      if (!showMenu) return;

      const closeMenu = (e) => {
         if (!ulRefAllBytestreams.current.contains(e.target)) {
            setShowMenu(false);
         }
      };

      document.addEventListener("click", closeMenu);

      return () => document.removeEventListener("click", closeMenu);
   }, [showMenu, dispatch]);

   const ulClassNameAllBytestreams =
      "profile-dropdown" + (showMenu ? "" : " hidden");
   const closeMenu = () => setShowMenu(false);

   return (
      <div>
         <div>
            <button onClick={openMenu}>
               <h1>Bytestreams</h1>
            </button>
            <ul className={ulClassNameAllBytestreams} ref={ulRefAllBytestreams}>
               <li>Placeholder for channels</li>
            </ul>
         </div>
      </div>
   );
}

export default BytestreamNameDropdown;
