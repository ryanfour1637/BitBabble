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

   const ulRefSingleBytespace = useRef();

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

   console.log(
      "🚀 ~ file: nameDropDown.js:21 ~ BytespaceNameDropdown ~ bytespacesMembershipRosters :",
      bytespacesMembershipRosters
   );
   console.log(
      "🚀 ~ file: nameDropDown.js:15 ~ BytespaceNameDropdown ~ userId:",
      userId
   );
   console.log(
      "🚀 ~ file: nameDropDown.js:15 ~ BytespaceNameDropdown ~ bytespaceId:",
      bytespaceId
   );
   const memberIdToDelete = bytespacesMembershipRosters[bytespaceId][userId];
   console.log(
      "🚀 ~ file: nameDropDown.js:28 ~ BytespaceNameDropdown ~ memberIdToDelete:",
      memberIdToDelete
   );

   return (
      <div>
         <div>
            <button onClick={openMenu}>
               <h1>{bytespaceObj.name}</h1>
            </button>
            <ul
               className={ulClassNameSingleBytespace}
               ref={ulRefSingleBytespace}
            >
               <li>{bytespaceObj.name}</li>
               <li>{bytespaceObj.dateCreated}</li>

               {userId == bytespaceObj.ownerId && (
                  <div>
                     <li>
                        <OpenModalButton
                           buttonText="Update your bytespace"
                           onItemClick={closeMenu}
                           modalComponent={
                              <UpdateBytespaceModal
                                 bytespaceObj={bytespaceObj}
                              />
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
                              <LeaveBytespaceModal
                                 idToDelete={memberIdToDelete}
                              />
                           }
                        />
                     </li>
                  </div>
               )}
            </ul>
         </div>
      </div>
   );
}

export default BytespaceNameDropdown;
