// Types
const GET_ONE_BYTESTREAMS_MESSAGES = "messages/GET_ALL_MESSAGES";
const ADD_NEW_MESSAGE = "messages/CREATE_MESSAGE";

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

// Reducer
const initialState = {};
export default function messagesReducer(state = initialState, action) {
   let newState;
   switch (action.type) {
      case GET_ONE_BYTESTREAMS_MESSAGES:
         newState = {};
         action.messagesObjsArr.forEach((messageObj) => {
            let bytestreamId = messageObj.bytestreamId;
            if (!newState[bytestreamId]) {
               newState[bytestreamId] = {};
               newState[bytestreamId][messageObj.id] = messageObj;
            } else {
               newState[bytestreamId][messageObj.id] = messageObj;
            }
         });
         return newState;
      case ADD_NEW_MESSAGE:
         newState = { ...state };
         const bytestreamId = action.messageObj.bytestreamId;
         if (!newState[bytestreamId]) {
            newState[bytestreamId] = {};
            newState[bytestreamId][action.messageObj.id] = action.messageObj;
         } else {
            newState[bytestreamId][action.messageObj.id] = action.messageObj;
         }
         return newState;
      default:
         return state;
   }
}
