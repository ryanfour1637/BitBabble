import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetAllBytespaces } from "../../store/bytespace";
import { thunkGetAllMembers } from "../../store/bytespace_members";
import OpenModalButton from "../OpenModalButton";
import JoinBytespaceModal from "../Leftside-Navbar/joinBytespaceModal";
import CreateBytespaceModal from "../Leftside-Navbar/createBytespaceModel";
import joinImage from "../../images/joinbytespaceimg.png";
import createImage from "../../images/createbytespaceimg.png";
import ProfileButton from "../Navigation/ProfileButton";
import "./loginlandingpage.css";

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
      <div className="loginlp-totaldiv">
         <div className="loginlp-topdiv">
            <h1 className="loginlp-topdiv-bitbabble">BitBabble</h1>
            <div className="loginlp-topdiv-bottomdiv">
               <h2 className="loginlp-topdiv-bottomdiv-welcome">
                  Welcome back! You look nice today.
               </h2>
               <h6 className="loginlp-topdiv-bottomdiv-choose">
                  Choose a workspace below to get back to working with your
                  team.
               </h6>
            </div>
         </div>
         <div className="loginlp-middiv">
            <h3 className="loginlp-middiv-your">{`Workspaces for ${user.firstName} ${user.lastName}`}</h3>
            {bytespacesArr.length > 0
               ? bytespacesToDisplay.map((bytespace) => (
                    <NavLink
                       className="loginlp-middiv-bytespace"
                       to={`/user/${user.id}/bytespaces/${bytespace.id}`}
                    >
                       <h2 className="loginlp-middiv-bytespacename">
                          {bytespace.name}
                       </h2>
                    </NavLink>
                 ))
               : null}
         </div>
         <div className="loginlp-bottom-divs">
            <div className="loginlp-bottom-divs-left">
               <img
                  className="loginlp-bottom-img"
                  src={createImage}
                  alt="lightbulb"
               />
               <p className="loginlp-bottom-divs-p">
                  Want to use BitBabble with a different team?
               </p>
            </div>
            <OpenModalButton
               buttonText="Create Workspace"
               modalComponent={<CreateBytespaceModal />}
            />
         </div>
         <div className="loginlp-bottom-divs">
            <div className="loginlp-bottom-divs-left">
               <img
                  className="loginlp-bottom-img"
                  src={joinImage}
                  alt="lightbulb"
               />
               <p className="loginlp-bottom-divs-p">
                  Looking for a different workspace?
               </p>
            </div>
            <OpenModalButton
               buttonText="Join Workspace"
               modalComponent={<JoinBytespaceModal />}
            />
         </div>
         <div>
            <ProfileButton user={user} logoutClass="login-landing-page" />
         </div>
      </div>
   );
}

export default LoginLandingPage;
