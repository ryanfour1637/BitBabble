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
import { useRightClickMenu } from "../../../context/rightClick";
import xmark from "../../../images/xmark.png";
import dropdown from "../../../images/dropdown.png";

function BytestreamNameDropdown({
   setBytestreamId,
   socket,
   bytestreamId,
   user,
}) {
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
   }, [dispatch]);

   // Null check for bytestreams and bytestreamsMembershipRosters
   if (bytestreams == undefined || Object.values(bytestreams).length === 0)
      return null;
   if (
      bytestreamsMembershipRosters == undefined ||
      Object.values(bytestreamsMembershipRosters).length === 0
   )
      return null;

   const joinedBytestreams = [];
   const nonJoinedBytestreams = [];

   const thisBytespacesBytestreams = bytestreams[bytespaceId];

   if (thisBytespacesBytestreams !== undefined) {
      Object.keys(thisBytespacesBytestreams).forEach((bytestreamId) => {
         const bytestream = bytestreams[bytespaceId][bytestreamId];

         // Check if the current user is a member of the bytestream
         if (
            bytestreamsMembershipRosters[bytespaceId] &&
            bytestreamsMembershipRosters[bytespaceId][bytestreamId] &&
            bytestreamsMembershipRosters[bytespaceId][bytestreamId][userId]
         ) {
            // Add to joinedBytestreams if user is a member
            joinedBytestreams.push(bytestream);
         } else {
            // Add to nonJoinedBytestreams if user is not a member
            nonJoinedBytestreams.push(bytestream);
         }
      });
   }

   const openMenu = () => {
      console.log("this is show menut", showMenu);
      if (showMenu) {
         setShowMenu(false);
      } else {
         setShowMenu(true);
      }
   };

   const onBytestreamClick = (e, bytestreamId) => {
      e.preventDefault();

      setBytestreamId(bytestreamId);
   };

   const handleRightClick = (e, bytestream) => {
      e.preventDefault();

      const bytestreamMemberId =
         bytestreamsMembershipRosters[bytestream.bytespaceId][bytestream.id][
            userId
         ];

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
                  <LeaveBytestreamModal
                     idToDelete={bytestreamMemberId}
                     socket={socket}
                     setBytestreamId={setBytestreamId}
                     bytestreamId={bytestreamId}
                     user={user}
                  />
               }
            />
            {bytestream.ownerId == userId && (
               <OpenModalButton
                  buttonText="Delete Bytestream"
                  onButtonClick={closeRightClickMenu}
                  modalComponent={
                     <DeleteBytestreamModal
                        bytestream={bytestream}
                        setBytestreamId={setBytestreamId}
                        idToDelete={bytestreamMemberId}
                     />
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
      setShowRightClickMenu(true);
   };

   const ulClassNameAllBytestreams =
      "profile-dropdown" + (showMenu ? "" : " hidden");
   const closeMenu = () => setShowMenu(false);

   return (
      <>
         <div className="bytestream-name-dropdown">
            <div className="bytestream-dropdown-div">
               <img
                  src={dropdown}
                  alt="dropdown"
                  className="dropdown-logo"
                  onClick={showMenu ? closeMenu : openMenu}
               />
               <h1 className="bytestream-name-words">Bytestreams</h1>
            </div>
            <div className="create-join-div">
               <OpenModalButton
                  buttonText="Create"
                  modalComponent={
                     <CreateBytestreamModal
                        bytespaceId={bytespaceId}
                        socket={socket}
                        setBytestreamId={setBytestreamId}
                     />
                  }
               />
               <OpenModalButton
                  buttonText="Join"
                  modalComponent={
                     <JoinBytestreamModal
                        nonJoinedBytestreamsToDisplay={nonJoinedBytestreams}
                        bytespaceId={bytespaceId}
                        socket={socket}
                        setBytestreamId={setBytestreamId}
                     />
                  }
               />
            </div>
            <ul className={ulClassNameAllBytestreams} ref={ulRefAllBytestreams}>
               <div className="joined-bytestreams-to-display">
                  {joinedBytestreams.length > 0 &&
                     joinedBytestreams.map((bytestream) => (
                        <li
                           key={bytestream.id}
                           onContextMenu={(e) =>
                              handleRightClick(e, bytestream)
                           }
                           onClick={(e) => onBytestreamClick(e, bytestream.id)}
                        >
                           {bytestream.name}{" "}
                        </li>
                     ))}
               </div>
            </ul>
         </div>
      </>
   );
}

export default BytestreamNameDropdown;
