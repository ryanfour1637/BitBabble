import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import CreateBytestreamModal from "./createBytestreamModal";
import JoinBytestreamModal from "./joinBytestreamModal";
import { thunkGetAllBytestreams } from "../../../store/bytestream";
import { thunkGetAllBytestreamMembers } from "../../../store/bytestream_members";
import { NavLink } from "react-router-dom";

function BytestreamNameDropdown() {
   const dispatch = useDispatch();
   const [showMenu, setShowMenu] = useState(false);
   const { userId, bytespaceId } = useParams();
   const ulRefAllBytestreams = useRef();

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

   // get all bytestreams
   const bytestreams = useSelector((state) => state.bytestreams);
   const bytestreamsMembershipRosters = useSelector(
      (state) => state.bytestreamMembers
   );
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

   const bytespaceBytestreamsArr = Object.values(bytespaceBytestreams);

   // retrieve all of the bytestream ids of the bytestreams in this bytespace
   const allBytestreamIdsInThisBytespaceArr = Object.keys(bytespaceBytestreams);
   const nonJoinedBytestreamIdArr = [];
   const joinedBytestreamIdArr = [];
   const joinedBytestreamsToDisplay = [];
   const nonJoinedBytestreamsToDisplay = [];

   // obtain all of the membership rosters for the various bytestreams

   // obtain just the membership rosters of the bytestreams in this bytespace.
   const thisBytespacesBytestreamsMembers =
      bytestreamsMembershipRosters[bytespaceId];

   // obtain the list of the bytestreams within this bytespace which the current user is not in
   // this check should not be necessary once I add the thunk to add the person who creates the channel to the channel but it is for now.
   for (let id of allBytestreamIdsInThisBytespaceArr) {
      if (!Object.keys(thisBytespacesBytestreamsMembers).includes(id)) {
         nonJoinedBytestreamIdArr.push(id);
      }
   }

   // split out the data into the bytestreamId (these are the keys) and the membership rosters (these are the values). The rosters are an object with keys which represent the user who is in the bytestream and values which represent the unique bytestream members id to make removing someone from a bytestream easier.

   for (let rosterData of Object.entries(thisBytespacesBytestreamsMembers)) {
      const [bytestreamId, roster] = rosterData;

      if (!Object.keys(roster).includes(userId.toString())) {
         nonJoinedBytestreamIdArr.push(bytestreamId);
      } else {
         joinedBytestreamIdArr.push(bytestreamId);
      }
   }

   for (let bytestream of bytespaceBytestreamsArr) {
      if (!nonJoinedBytestreamIdArr.includes(bytestream.id.toString())) {
         joinedBytestreamsToDisplay.push(bytestream);
      } else {
         nonJoinedBytestreamsToDisplay.push(bytestream);
      }
   }
   console.log(
      "🚀 ~ file: bytestreamDropDown.js:62 ~ BytestreamNameDropdown ~ joinedBytestreamsToDisplay:",
      joinedBytestreamsToDisplay
   );
   console.log(
      "🚀 ~ file: bytestreamDropDown.js:64 ~ BytestreamNameDropdown ~ nonJoinedBytestreamsToDisplay:",
      nonJoinedBytestreamsToDisplay
   );
   console.log(
      "🚀 ~ file: bytestreamDropDown.js:51 ~ BytestreamNameDropdown ~ nonJoinedBytestreamIdArr:",
      nonJoinedBytestreamIdArr
   );
   console.log(
      "🚀 ~ file: bytestreamDropDown.js:53 ~ BytestreamNameDropdown ~ joinedBytestreamIdArr:",
      joinedBytestreamIdArr
   );

   const openMenu = () => {
      if (showMenu) return;
      setShowMenu(true);
   };

   // useEffect(() => {
   //    dispatch(thunkGetAllBytestreams());
   //    dispatch(thunkGetAllBytestreamMembers());
   //    if (!showMenu) return;

   //    const closeMenu = (e) => {
   //       if (
   //          ulRefAllBytestreams.current &&
   //          !ulRefAllBytestreams.current.contains(e.target)
   //       ) {
   //          setShowMenu(false);
   //       }
   //    };

   //    document.addEventListener("click", closeMenu);

   //    return () => document.removeEventListener("click", closeMenu);
   // }, [showMenu, dispatch]);

   const ulClassNameAllBytestreams =
      "profile-dropdown" + (showMenu ? "" : " hidden");
   const closeMenu = () => setShowMenu(false);

   // if (bytestreams == undefined || Object.values(bytestreams).length === 0) {
   //    return null;
   // }

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
                        modalComponent={
                           <JoinBytestreamModal
                              bytespaceBytestreamsArr={bytespaceBytestreamsArr}
                              // bytestreamMembershipRosters={
                              //    bytestreamMembershipRosters
                              // }
                              userId={userId}
                              bytespaceId={bytespaceId}
                           />
                        }
                     />
                  </li>
                  {joinedBytestreamsToDisplay &&
                     joinedBytestreamsToDisplay.map((bytestream) => (
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
