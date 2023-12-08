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

function BytestreamNameDropdown() {
   const dispatch = useDispatch();
   const [showMenu, setShowMenu] = useState(false);
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

   if (
      bytestreamsMembershipRosters == undefined ||
      Object.values(bytestreamsMembershipRosters).length === 0
   )
      return null;
   if (bytestreams == undefined || Object.values(bytestreams).length === 0) {
      return null;
   }

   // filter for the bytestream data specific to the bytespace we are currently in

   const bytespaceBytestreams = bytestreams[bytespaceId];

   // const bytespaceBytestreamsArr = Object.values(bytespaceBytestreams);
   const bytespaceBytestreamsArr = Object.values(bytespaceBytestreams ?? {});

   // retrieve all of the bytestream ids of the bytestreams in this bytespace
   // const allBytestreamIdsInThisBytespaceArr = Object.keys(bytespaceBytestreams);
   const allBytestreamIdsInThisBytespaceArr = bytespaceBytestreams
      ? Object.keys(bytespaceBytestreams)
      : [];

   const nonJoinedBytestreamIdArr = [];
   const joinedBytestreamIdArr = [];
   const joinedBytestreamsToDisplay = [];

   const nonJoinedBytestreamsToDisplay = [];

   // obtain all of the membership rosters for the various bytestreams

   // obtain just the membership rosters of the bytestreams in this bytespace.

   const allBytespacesBytestreamsMembers = Object.values(
      bytestreamsMembershipRosters ?? {}
   );

   const thisBytespacesBytestreamsMembers = [];

   for (let bytestreamObj of allBytespacesBytestreamsMembers) {
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
         <div>
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

      openRightClickMenu(menuContent, position);
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
