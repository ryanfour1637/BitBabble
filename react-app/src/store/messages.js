// Types
const GET_MESSAGES = "messages/GET_ALL_MESSAGES";
const ADD_NEW_MESSAGE = "messages/CREATE_MESSAGE";
const DELETE_MESSAGE = "messages/DELETE_MESSAGE";

// Actions

// messages is an array of message objects coming from the backend for one bytestream
const actionGetMessages = (messagesObjsArr) => ({
   type: GET_MESSAGES,
   messagesObjsArr,
});

export const actionAddNewMessage = (messageObj) => ({
   type: ADD_NEW_MESSAGE,
   messageObj,
});

const actionDeleteMessage = (messageObj) => ({
   type: DELETE_MESSAGE,
   messageObj,
});

// Thunks

export const thunkGetAllMessages = () => async (dispatch) => {
   const response = await fetch(`/api/messages`);
   if (response.ok) {
      const data = await response.json();
      dispatch(actionGetMessages(data));
      return data;
   } else {
      const errors = await response.json();
      return errors;
   }
};

const initialState = {};
export default function messagesReducer(state = initialState, action) {
   let newState;
   let bytestreamId;
   let messageId;
   switch (action.type) {
      case GET_MESSAGES:
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
         }
         newState[bytestreamId][messageId] = action.messageObj;
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
