import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LoginLandingPage from "./components/LoginLandingPage";
import SingleBytespaceLandingPage from "./components/Bytespace";
import LoggedOutLandingPage from "./components/Homepage";

function App() {
   const dispatch = useDispatch();
   const [isLoaded, setIsLoaded] = useState(false);
   const user = useSelector((state) => state.session.user);

   useEffect(() => {
      dispatch(authenticate()).then(() => setIsLoaded(true));
   }, [dispatch]);

   return (
      <>
         <Navigation isLoaded={isLoaded} />
         {isLoaded && (
            <Switch>
               <Route path="/user/:userId/bytespaces/:bytespaceId/bytestream/:bytestreamId"></Route>
               <Route path="/user/:userId/bytespaces/:bytespaceId">
                  <SingleBytespaceLandingPage />
               </Route>
               <Route path="/login">
                  <LoginFormPage />
               </Route>
               <Route path="/signup">
                  <SignupFormPage />
               </Route>

               {!user ? (
                  <Route path="/">
                     <LoggedOutLandingPage />
                  </Route>
               ) : (
                  <Route path="/">
                     <LoginLandingPage />
                  </Route>
               )}
            </Switch>
         )}
      </>
   );
}

export default App;
