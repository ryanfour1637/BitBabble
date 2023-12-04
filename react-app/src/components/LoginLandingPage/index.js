import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { thunkGetAllBytespaces } from "../../store/bytespace";
import { thunkGetAllMembers } from "../../store/bytespace_members";
import OpenModalButton from "../OpenModalButton";
import JoinBytespaceModal from "../Leftside-Navbar/joinBytespaceModal";

function LoginLandingPage() {
   const dispatch = useDispatch();
   const user = useSelector((state) => state.session.user);
   const bytespaces = useSelector((state) => state.bytespace.bytespaces);
   const bytespacesArr = Object.values(bytespaces);
   const bytespacesMembershipRosters = useSelector(
      (state) => state.bytespaceMembers
   );
   const bytespacesMembershipRostersArr = Object.entries(
      bytespacesMembershipRosters
   );

   const joinedBytespaceArr = [];

   for (let rosterData of bytespacesMembershipRostersArr) {
      const [bytespaceId, roster] = rosterData;

      if (Object.keys(roster).includes(user.id.toString())) {
         joinedBytespaceArr.push(bytespaceId);
      }
   }

   const bytespacesToDisplay = [];

   for (let bytespace of bytespacesArr) {
      if (joinedBytespaceArr.includes(bytespace.id.toString())) {
         bytespacesToDisplay.push(bytespace);
      }
   }
   useEffect(() => {
      dispatch(thunkGetAllBytespaces());
      dispatch(thunkGetAllMembers());
   }, [dispatch]);

   return (
      <div>
         {bytespacesArr.length > 0 ? (
            bytespacesToDisplay.map((bytespace) => (
               <NavLink to={`/user/${user.id}/bytespaces/${bytespace.id}`}>
                  <h2>{bytespace.name}</h2>
               </NavLink>
            ))
         ) : (
            <div>
               <h2>Interested in joining a public bytespace?? </h2>
               <OpenModalButton
                  buttonText="Join Here!"
                  modalComponent={<JoinBytespaceModal />}
               />
            </div>
         )}
      </div>
   );
}

export default LoginLandingPage;
