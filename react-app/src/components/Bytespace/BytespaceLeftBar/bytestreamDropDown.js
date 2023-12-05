import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import CreateBytestreamModal from "./createBytestreamModal";
import JoinBytestreamModal from "./joinBytestreamModal";
import { thunkGetAllBytestreams } from "../../../store/bytestream";
import { NavLink } from "react-router-dom";

function BytestreamNameDropdown() {
   const dispatch = useDispatch();
   const [showMenu, setShowMenu] = useState(false);
   const { userId, bytespaceId } = useParams();
   const bytestreams = useSelector((state) => state.bytestreams);
   const bytespaceBytestreams = bytestreams[bytespaceId];

   const ulRefAllBytestreams = useRef();

   const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
   };

   useEffect(() => {
      dispatch(thunkGetAllBytestreams());
      if (!showMenu) return;

      const closeMenu = (e) => {
         if (
            ulRefAllBytestreams.current &&
            !ulRefAllBytestreams.current.contains(e.target)
         ) {
            setShowMenu(false);
         }
      };

      document.addEventListener("click", closeMenu);

      return () => document.removeEventListener("click", closeMenu);
   }, [showMenu, dispatch]);

   const ulClassNameAllBytestreams =
      "profile-dropdown" + (showMenu ? "" : " hidden");
   const closeMenu = () => setShowMenu(false);

   if (bytestreams == undefined || Object.values(bytestreams).length === 0) {
      return null;
   }
   const bytespaceBytestreamsArr = Object.values(bytespaceBytestreams);
   return (
      <div>
         <div>
            <button onClick={openMenu}>
               <h1>Bytestreams</h1>
            </button>

            <ul className={ulClassNameAllBytestreams} ref={ulRefAllBytestreams}>
               <div>
                  <li>
                     <OpenModalButton
                        buttonText="Create"
                        onButtonClick={closeMenu}
                        modalComponent={
                           <CreateBytestreamModal bytespaceId={bytespaceId} />
                        }
                     />
                     <OpenModalButton
                        buttonText="Join"
                        onButtonClick={closeMenu}
                        modalComponent={<JoinBytestreamModal />}
                     />
                  </li>
                  {bytespaceBytestreamsArr &&
                     bytespaceBytestreamsArr.map((bytestream) => (
                        <li key={bytestream.id}>
                           <NavLink
                              to={`/user/${userId}/bytespaces/${bytespaceId}/bytestream/${bytestream.id}`}
                           >
                              {bytestream.name}{" "}
                           </NavLink>
                        </li>
                     ))}
               </div>
            </ul>
         </div>
      </div>
   );
}

export default BytestreamNameDropdown;
