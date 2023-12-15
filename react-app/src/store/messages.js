// Types
const GET_ONE_BYTESTREAMS_MESSAGES = "messages/GET_ALL_MESSAGES";
const ADD_NEW_MESSAGE = "messages/CREATE_MESSAGE";
const DELETE_MESSAGE = "messages/DELETE_MESSAGE";

// Actions

// messages is an array of message objects coming from the backend for one bytestream
const actionGetOneBytestreamsMessages = (messagesObjsArr) => ({
   type: GET_ONE_BYTESTREAMS_MESSAGES,
   messagesObjsArr,
});

const actionAddNewMessage = (messageObj) => ({
   type: ADD_NEW_MESSAGE,
   messageObj,
});

const actionDeleteMessage = (messageObj) => ({
   type: DELETE_MESSAGE,
   messageObj,
});

// Thunks

export const thunkGetOneBytestreamsMessages =
   (bytestreamId) => async (dispatch) => {
      const response = await fetch(`/api/messages/${bytestreamId}`);
      if (response.ok) {
         const data = await response.json();
         dispatch(actionGetOneBytestreamsMessages(data));
         return data;
      } else {
         const errors = await response.json();
         return errors;
      }
   };

export const thunkAddNewMessage = (messageObj) => async (dispatch) => {
   const response = await fetch(`/api/messages/create`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(messageObj),
   });

   if (response.ok) {
      const data = await response.json();
      dispatch(actionAddNewMessage(data));
      return data;
   } else {
      const errors = await response.json();
      return errors;
   }
};

export const thunkUpdateMessage = (messageObj) => async (dispatch) => {
   const response = await fetch(`/api/messages/${messageObj.id}/update`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(messageObj),
   });

   if (response.ok) {
      const data = await response.json();
      dispatch(actionAddNewMessage(data));
   }
};

export const thunkDeleteMessage = (messageObj) => async (dispatch) => {
   const response = await fetch(`/api/messages/${messageObj.id}/delete`, {
      method: "DELETE",
   });

   if (response.ok) {
      await response.json();
      dispatch(actionDeleteMessage(messageObj));
      return null;
   } else {
      const errors = await response.json();
      return errors;
   }
};

// Reducer
const initialState = {};
export default function messagesReducer(state = initialState, action) {
   let newState;
   let bytestreamId;
   let messageId;
   switch (action.type) {
      case GET_ONE_BYTESTREAMS_MESSAGES:
         newState = {};
         action.messagesObjsArr.forEach((messageObj) => {
            let bytestreamId = messageObj.bytestreamId;
            let messageId = messageObj.id;
            if (!newState[bytestreamId]) {
               newState[bytestreamId] = {};
               newState[bytestreamId][messageId] = messageObj;
            } else {
               newState[bytestreamId][messageId] = messageObj;
            }
         });
         return newState;
      case ADD_NEW_MESSAGE:
         newState = { ...state };
         bytestreamId = action.messageObj.bytestreamId;
         messageId = action.messageObj.id;
         if (!newState[bytestreamId]) {
            newState[bytestreamId] = {};
            newState[bytestreamId][messageId] = action.messageObj;
         } else {
            newState[bytestreamId][messageId] = action.messageObj;
         }
         return newState;
      case DELETE_MESSAGE:
         newState = { ...state };
         messageId = action.messageObj.id;
         bytestreamId = action.messageObj.bytestreamId;
         delete newState[bytestreamId][messageId];
         return newState;
      default:
         return state;
   }
}
