import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import UpdateBytespaceModal from "./updateBytespace";
import DeleteBytespaceModal from "./deleteBytespaceModal";
import LeaveBytespaceModal from "./leaveBytespaceModal";
import { thunkGetAllBytespaces } from "../../../store/bytespace";
import { thunkGetAllMembers } from "../../../store/bytespace_members";

function BytespaceNameDropdown() {
   const dispatch = useDispatch();
   const ulRefSingleBytespace = useRef();
   const [showMenu, setShowMenu] = useState(false);
   const { userId, bytespaceId } = useParams();

   const bytespaces = useSelector((state) => state.bytespace.bytespaces);
   const bytespacesArr = Object.values(bytespaces);
   const bytespacesMembershipRosters = useSelector(
      (state) => state.bytespaceMembers
   );

   const singleBytespace = bytespacesArr.filter(
      (bytespace) => bytespace.id == bytespaceId
   );
   const bytespaceObj = singleBytespace[0];

   const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
   };

   useEffect(() => {
      dispatch(thunkGetAllBytespaces());
      dispatch(thunkGetAllMembers());
      if (!showMenu) return;

      const closeMenu = (e) => {
         if (!ulRefSingleBytespace.current.contains(e.target)) {
            setShowMenu(false);
         }
      };

      document.addEventListener("click", closeMenu);

      return () => document.removeEventListener("click", closeMenu);
   }, [showMenu, dispatch]);

   const ulClassNameSingleBytespace =
      "profile-dropdown" + (showMenu ? "" : " hidden");
   const closeMenu = () => setShowMenu(false);

   if (bytespaceObj == undefined) return null;
   if (
      bytespacesMembershipRosters == undefined ||
      Object.values(bytespacesMembershipRosters).length === 0
   )
      return null;

   const memberIdToDelete = bytespacesMembershipRosters[bytespaceId][userId];

   return (
      <div className="bytespace-namedropdown-div">
         <h1 className="bytespace-name-words" onClick={openMenu}>
            {bytespaceObj.name}
         </h1>

         <ul className={ulClassNameSingleBytespace} ref={ulRefSingleBytespace}>
            {userId == bytespaceObj.ownerId && (
               <div>
                  <li>
                     <OpenModalButton
                        buttonText="Update your bytespace"
                        onItemClick={closeMenu}
                        modalComponent={
                           <UpdateBytespaceModal bytespaceObj={bytespaceObj} />
                        }
                     />
                  </li>
                  <li>
                     {" "}
                     <OpenModalButton
                        buttonText="Delete your bytespace"
                        onItemClick={closeMenu}
                        modalComponent={
                           <DeleteBytespaceModal bytespaceId={bytespaceId} />
                        }
                     />
                  </li>
               </div>
            )}

            {userId != bytespaceObj.ownerId && (
               <div>
                  <li>
                     <OpenModalButton
                        buttonText="Leave Bytespace"
                        onItemClick={closeMenu}
                        modalComponent={
                           <LeaveBytespaceModal idToDelete={memberIdToDelete} />
                        }
                     />
                  </li>
               </div>
            )}
         </ul>
      </div>
   );
}

export default BytespaceNameDropdown;
