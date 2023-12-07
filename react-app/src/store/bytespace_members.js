// Types

const ADD_TO_BYTESPACE = "bytespace_members/ADD_TO_BYTESPACE";
const REMOVE_FROM_BYTESPACE = "bytespace_members/REMOVE_FROM_BYTESPACE";
const GET_ALL_MEMBERS = "bytespace_members/GET_ALL_MEMBERS";

// Actions

// bytespace user object is an object with a key of bytespaceId and userId
const actionAddToBytespace = (bytespaceMemberObj) => ({
   type: ADD_TO_BYTESPACE,
   bytespaceMemberObj,
});

// bytespace user object is an object with a key of bytespaceId and userId
const actionRemoveFromBytespace = (bytespaceMemberObj) => ({
   type: REMOVE_FROM_BYTESPACE,
   bytespaceMemberObj,
});

// get all the bytespacemembers info.
// filter out the ones which the specific users id is already included in
// display the rest on the page

const actionGetAllBytespaceMembers = (arrOfMemberObjs) => ({
   type: GET_ALL_MEMBERS,
   arrOfMemberObjs,
});

// thunks
export const thunkAddToBytespace = (bytespaceId) => async (dispatch) => {
   const response = await fetch(
      `/api/bytespace_members/${bytespaceId}/add_user`,
      { method: "POST" }
   );

   if (response.ok) {
      const bytespaceMemberObj = await response.json();
      dispatch(actionAddToBytespace(bytespaceMemberObj));
      return null;
   } else {
      const errors = await response.json();
      return errors;
   }
};

// passing in the id for the bytespaceUsers table to easily remove by that id when someone leaves a space
export const thunkRemoveFromBytespace =
   (bytespaceMemberId) => async (dispatch) => {
      const response = await fetch(
         `/api/bytespace_members/${bytespaceMemberId}`,
         {
            method: "DELETE",
         }
      );
      const bytespaceUserObj = await response.json();

      dispatch(actionRemoveFromBytespace(bytespaceUserObj));
      return null;
   };

export const thunkGetAllMembers = () => async (dispatch) => {
   const response = await fetch("/api/bytespace_members/get_all_members");

   if (response.ok) {
      const arrOfMembers = await response.json();
      dispatch(actionGetAllBytespaceMembers(arrOfMembers));
      return arrOfMembers;
   } else {
      const errors = await response.json();
      return errors;
   }
};

// Reducer
//key on the outside will be the bytespaceId and then inside it will be keys and values of the bytespaceUsersId so that it will be easy to delete when needed.

const initialState = {};
export default function bytespaceMembersReducer(state = initialState, action) {
   let newState;
   let bytespaceId;
   let userId;
   let id;
   switch (action.type) {
      case ADD_TO_BYTESPACE:
         ({ bytespaceId, userId, id } = action.bytespaceMemberObj);
         newState = { ...state };
         if (!newState[bytespaceId]) newState[bytespaceId] = {};
         newState[bytespaceId][userId] = id;
         return newState;
      case REMOVE_FROM_BYTESPACE:
         ({ bytespaceId, userId, id } = action.bytespaceMemberObj);
         newState = { ...state };
         delete newState.bytespaceId[bytespaceId][userId];
         if (Object.keys(newState[bytespaceId].length === 0))
            delete newState[bytespaceId];
         return newState;
      case GET_ALL_MEMBERS:
         newState = {};
         action.arrOfMemberObjs.forEach((member) => {
            if (!newState[member.bytespaceId]) {
               newState[member.bytespaceId] = {};
               newState[member.bytespaceId][member.userId] = member.id;
            } else {
               newState[member.bytespaceId][member.userId] = member.id;
            }
         });
         return newState;
      default:
         return state;
   }
}
