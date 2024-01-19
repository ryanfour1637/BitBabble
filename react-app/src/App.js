import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import LoginLandingPage from "./components/LoginLandingPage";
import SingleBytespaceLandingPage from "./components/Bytespace";
import LoggedOutLandingPage from "./components/Homepage";
import { WebSocketProvider } from "./context/webSocket";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
   const user = useSelector((state) => state.session.user);

   return (
      <WebSocketProvider user={user}>
         <>
            <Switch>
               <Route path="/user/:userId/bytespaces/:bytespaceId">
                  <SingleBytespaceLandingPage user={user} />
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
         </>
      </WebSocketProvider>
   );
}

export default App;
