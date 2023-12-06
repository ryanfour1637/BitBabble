// Types

const ADD_TO_BYTESTREAM = "bytestream_members/ADD_TO_BYTESTREAM";
const REMOVE_FROM_BYTESTREAM = "bytestream_members/REMOVE_FROM_BYTESTREAM";
const GET_ALL_MEMBERS = "bytestream_members/GET_ALL_MEMBERS";

// Actions

const actionAddToBytestream = (bytestreamMemberObj) => ({
   type: ADD_TO_BYTESTREAM,
   bytestreamMemberObj,
});

const actionRemoveFromBytestream = (bytestreamMemberObj) => ({
   type: REMOVE_FROM_BYTESTREAM,
   bytestreamMemberObj,
});

const actionGetAllBytestreamMembers = (arrOfMemberObjs) => ({
   type: GET_ALL_MEMBERS,
   arrOfMemberObjs,
});

// Thunks

export const thunkAddToBytestream =
   (bytestreamId, bytespaceId) => async (dispatch) => {
      const response = await fetch(
         `/api/bytestream_members/${bytespaceId}/bytestreams/${bytestreamId}/add_user`,
         { method: "POST" }
      );

      if (response.ok) {
         const bytestreamMemberObj = await response.json();
         dispatch(actionAddToBytestream(bytestreamMemberObj));
         return null;
      } else {
         const errors = await response.json();
         return errors;
      }
   };

export const thunkRemoveFromBytestream =
   (bytestreamMemberId) => async (dispatch) => {
      const response = await fetch(
         `/api/bytestream_members/${bytestreamMemberId}`,
         {
            method: "DELETE",
         }
      );
      const bytestreamMemberObj = await response.json();

      dispatch(actionRemoveFromBytestream(bytestreamMemberObj));
      return null;
   };

export const thunkGetAllBytestreamMembers = () => async (dispatch) => {
   const response = await fetch("/api/bytestream_members/get_all_members");

   if (response.ok) {
      const arrOfMembers = await response.json();
      dispatch(actionGetAllBytestreamMembers(arrOfMembers));
      return arrOfMembers;
   } else {
      const errors = await response.json();
      return errors;
   }
};

// Reducer

const initialState = {};
export default function bytestreamMembersReducer(state = initialState, action) {
   let newState;
   let bytestreamId;
   let userId;
   let id;
   let bytespaceId;
   switch (action.type) {
      case ADD_TO_BYTESTREAM:
         ({ bytestreamId, bytespaceId, userId, id } =
            action.bytestreamMemberObj);
         newState = { ...state };
         if (!newState[bytespaceId]) {
            newState[bytespaceId] = {};
            newState[bytespaceId][bytestreamId] = {};
            newState[bytespaceId][bytestreamId][userId] = id;
         } else if (!newState[bytespaceId][bytestreamId]) {
            newState[bytespaceId][bytestreamId] = {};
            newState[bytespaceId][bytestreamId][userId] = id;
         } else {
            newState[bytespaceId][bytestreamId][userId] = id;
         }
         return newState;
      case REMOVE_FROM_BYTESTREAM:
         ({ bytestreamId, userId, id } = action.bytestreamMemberObj);
         newState = { ...state };
         delete newState.bytestreamId[bytestreamId][userId];
         if (Object.keys(newState[bytestreamId].length === 0))
            delete newState[bytestreamId];
         return newState;
      case GET_ALL_MEMBERS:
         newState = {};
         action.arrOfMemberObjs.forEach((member) => {
            const { bytestreamId, bytespaceId, userId, id } = member;
            if (!newState[bytespaceId]) {
               newState[bytespaceId] = {};
               newState[bytespaceId][bytestreamId] = {};
               newState[bytespaceId][bytestreamId][userId] = id;
            } else if (!newState[bytespaceId][bytestreamId]) {
               newState[bytespaceId][bytestreamId] = {};
               newState[bytespaceId][bytestreamId][userId] = id;
            } else {
               newState[bytespaceId][bytestreamId][userId] = id;
            }
         });
         return newState;

      default:
         return state;
   }
}
