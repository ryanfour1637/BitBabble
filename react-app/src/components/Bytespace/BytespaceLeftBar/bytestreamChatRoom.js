import React, { useState, useEffect } from "react";
import { useWebSocket } from "../../../context/webSocket";
import { thunkAddNewMessage } from "../../../store/messages";
import { useDispatch } from "react-redux";

function BytestreamChatRoom({ bytestreamId }) {
   const dispatch = useDispatch();
   const createMessage = (e) => {
      e.preventDefault();
      const message = e.target.value;
      if (message === "") return;

      const messageObj = {
         bytestreamId: bytestreamId,
         message: message,
      };
      // Send message to backend
      dispatch(thunkAddNewMessage(messageObj));
      // Clear input field
   };
}
