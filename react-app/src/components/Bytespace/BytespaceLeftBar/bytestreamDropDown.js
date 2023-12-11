import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import CreateBytestreamModal from "./createBytestreamModal";
import JoinBytestreamModal from "./joinBytestreamModal";
import UpdateBytestreamModal from "./updateBytestreamModal";
import LeaveBytestreamModal from "./leaveBytestreamModal";
import DeleteBytestreamModal from "./deleteBytestreamModal";
import { thunkGetAllBytestreams } from "../../../store/bytestream";
import { thunkGetAllBytestreamMembers } from "../../../store/bytestream_members";
import { NavLink } from "react-router-dom";
import { useRightClickMenu } from "../../../context/rightClick";
import xmark from "../../../images/xmark.png";

function BytestreamNameDropdown() {
   const dispatch = useDispatch();
   const [showMenu, setShowMenu] = useState(false);
   const [showRightClickMenu, setShowRightClickMenu] = useState(false);
   const { userId, bytespaceId } = useParams();
   const ulRefAllBytestreams = useRef();
   const { openRightClickMenu, closeRightClickMenu } = useRightClickMenu();
   const bytestreams = useSelector((state) => state.bytestreams);
   const bytestreamsMembershipRosters = useSelector(
      (state) => state.bytestreamMembers
   );

   useEffect(() => {
      dispatch(thunkGetAllBytestreams());
      dispatch(thunkGetAllBytestreamMembers());

      if (showMenu) {
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
      }
   }, [showMenu, showRightClickMenu, dispatch]);

   if (
      bytestreamsMembershipRosters == undefined ||
      Object.values(bytestreamsMembershipRosters).length === 0
   )
      return null;
   console.log(
      "🚀 ~ file: bytestreamDropDown.js:47 ~ BytestreamNameDropdown ~ bytestreamsMembershipRosters:",
      bytestreamsMembershipRosters
   );
   if (bytestreams == undefined || Object.values(bytestreams).length === 0) {
      return null;
   }
   console.log(
      "🚀 ~ file: bytestreamDropDown.js:55 ~ BytestreamNameDropdown ~ bytestreams:",
      bytestreams
   );

   // filter for the bytestream objects specific to the bytespace we are currently in
   const bytespaceBytestreams = bytestreams[bytespaceId];
   console.log(
      "🚀 ~ file: bytestreamDropDown.js:65 ~ BytestreamNameDropdown ~ bytespaceBytestreams:",
      bytespaceBytestreams
   );

   // creating an array of the bytestream objects within a bytespace
   const bytespaceBytestreamsArr = Object.values(bytespaceBytestreams ?? {});
   console.log(
      "🚀 ~ file: bytestreamDropDown.js:72 ~ BytestreamNameDropdown ~ bytespaceBytestreamsArr:",
      bytespaceBytestreamsArr
   );

   // retrieve all of the bytestream ids of the bytestreams in this bytespace
   const allBytestreamIdsInThisBytespaceArr = bytespaceBytestreams
      ? Object.keys(bytespaceBytestreams)
      : [];
   console.log(
      "🚀 ~ file: bytestreamDropDown.js:79 ~ BytestreamNameDropdown ~ allBytestreamIdsInThisBytespaceArr:",
      allBytestreamIdsInThisBytespaceArr
   );

   // create an array of the non-joined bytestream Ids so that I can filter the bytestream object arrays for the entire array.
   // there is an opportunity to do this wihtout this step or in a faster way (not for captstone but for after)
   const nonJoinedBytestreamIdArr = [];

   // create an array of the joined bytestream Ids so that I can filter the bytestream object arrays for the entire array.
   // there is an opportunity to do this wihtout this step or in a faster way (not for captstone but for after)
   const joinedBytestreamIdArr = [];

   // create an array to hold the bytestream objects of the bytestreams which the user has already joined
   // there is an opportunity to do this wihtout this step or in a faster way (not for captstone but for after)
   const joinedBytestreamsToDisplay = [];

   // create an array to hold the bytestream objects of the bytestreams which the user has NOT already joined.
   // there is an opportunity to do this wihtout this step or in a faster way (not for captstone but for after)
   const nonJoinedBytestreamsToDisplay = [];

   // because I already have the list of arrays which includes the bytestreams from this particular bytespace, I am filtering for all of the bytestreams membership rosters. I will further filter this to check just the bytestreams from this bytespace by using that array.
   const allBytespacesBytestreamsMembers = Object.values(
      bytestreamsMembershipRosters ?? {}
   );
   console.log(
      "🚀 ~ file: bytestreamDropDown.js:108 ~ BytestreamNameDropdown ~ allBytespacesBytestreamsMembers:",
      allBytespacesBytestreamsMembers
   );

   const thisBytespacesBytestreamsMembers = [];

   //up to here in DEBUGGING
   for (let bytestreamObj of allBytespacesBytestreamsMembers) {
      console.log(
         "🚀 ~ file: bytestreamDropDown.js:114 ~ BytestreamNameDropdown ~ bytestreamObj:",
         bytestreamObj
      );
      if (
         allBytestreamIdsInThisBytespaceArr.includes(
            Object.keys(bytestreamObj)[0]
         )
      ) {
         thisBytespacesBytestreamsMembers.push(bytestreamObj);
      }
   }

   if (Object.values(thisBytespacesBytestreamsMembers).length > 0) {
      for (let rosterData of Object.values(thisBytespacesBytestreamsMembers)) {
         const bytestreamId = Object.keys(rosterData)[0];
         const roster = Object.values(rosterData)[0];

         const membershipArr = Object.keys(roster);

         for (let memberUserId of membershipArr) {
            if (memberUserId == userId) {
               joinedBytestreamIdArr.push(bytestreamId);
            } else {
               nonJoinedBytestreamIdArr.push(bytestreamId);
            }
         }
      }
   } else {
      for (let id of allBytestreamIdsInThisBytespaceArr) {
         nonJoinedBytestreamIdArr.push(id);
      }
   }

   // create two buckets. One to display the bytestreams this particular user is already in and the other to pass as a prop to the join bytestream modal.

   for (let bytestream of bytespaceBytestreamsArr) {
      if (!nonJoinedBytestreamIdArr.includes(bytestream.id.toString())) {
         joinedBytestreamsToDisplay.push(bytestream);
      } else {
         nonJoinedBytestreamsToDisplay.push(bytestream);
      }
   }

   const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
   };

   const handleRightClick = (e, bytestream) => {
      e.preventDefault();

      const bytestreamMemberId =
         thisBytespacesBytestreamsMembers[0][bytestream.id][userId];

      const menuContent = (
         <div className="parent-element-context">
            <img
               src={xmark}
               alt="close menu"
               onClick={closeRightClickMenu}
               className="small-x"
            />
            <OpenModalButton
               buttonText="Update Bytestream"
               onButtonClick={closeRightClickMenu}
               modalComponent={
                  <UpdateBytestreamModal bytestream={bytestream} />
               }
            />
            <OpenModalButton
               buttonText="Leave Bytestream"
               onButtonClick={closeRightClickMenu}
               modalComponent={
                  <LeaveBytestreamModal idToDelete={bytestreamMemberId} />
               }
            />
            {bytestream.ownerId == userId && (
               <OpenModalButton
                  buttonText="Delete Bytestream"
                  onButtonClick={closeRightClickMenu}
                  modalComponent={
                     <DeleteBytestreamModal bytestream={bytestream} />
                  }
               />
            )}
         </div>
      );
      const position = {
         x: e.pageX,
         y: e.pageY,
      };
      closeMenu();
      openRightClickMenu(menuContent, position);
      setShowRightClickMenu(true);
   };

   const ulClassNameAllBytestreams =
      "profile-dropdown" + (showMenu ? "" : " hidden");
   const closeMenu = () => setShowMenu(false);

   return (
      <div className="bytestream-name-dropdown">
         <h1 className="bytestream-name-words" onClick={openMenu}>
            Bytestreams
         </h1>

         <ul className={ulClassNameAllBytestreams} ref={ulRefAllBytestreams}>
            <div className="joined-bytestreams-to-display">
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
                     modalComponent={
                        <JoinBytestreamModal
                           nonJoinedBytestreamsToDisplay={
                              nonJoinedBytestreamsToDisplay
                           }
                           bytespaceId={bytespaceId}
                        />
                     }
                  />
               </li>
               {joinedBytestreamsToDisplay.length > 0 &&
                  joinedBytestreamsToDisplay.map((bytestream) => (
                     <li
                        key={bytestream.id}
                        onContextMenu={(e) => handleRightClick(e, bytestream)}
                     >
                        {bytestream.name}{" "}
                     </li>
                  ))}
            </div>
         </ul>
      </div>
   );
}

export default BytestreamNameDropdown;
