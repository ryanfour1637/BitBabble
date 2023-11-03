// Types

const ADD_TO_BYTESPACE = "bytespace_members/ADD_TO_BYTESPACE";
const REMOVE_FROM_BYTESPACE = "bytespace_members/REMOVE_FROM_BYTESPACE";

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

// thunks
export const thunkAddToBytespace = (bytespaceId) => async (dispatch) => {
   const response = await fetch(
      `/api/bytespace_members/bytespaces/${bytespaceId}/add_user`,
      { method: "POST" }
   );

   if (response.ok) {
      const bytespaceUserObj = await response.json();
      dispatch(actionAddToBytespace(bytespaceUserObj));
      return null;
   } else {
      const errors = await response.json();
      return errors;
   }
};

// passing in the id for the bytespaceUsers table to easily remove by that id when someone leaves a space
export const thunkRemoveFromBytespace =
   (bytespaceMemberId) => async (dispatch) => {
      const response = fetch(`/api/bytespace_members/${bytespaceMemberId}`, {
         method: "DELETE",
      });
      const bytespaceUserObj = (await response).json();

      dispatch(actionRemoveFromBytespace(bytespaceUserObj));
      return null;
   };

//reducer
//key on the outside will be the bytespaceId and then inside it will be keys and values of the bytespaceUsersId so that it will be easy to delete when needed.

const initialState = { bytespaceId: {
    userId: {}
} };
export default function bytespaceMembersReducer(state = initialState, action) {
   let newState;
   switch (action.type) {
      case ADD_TO_BYTESPACE:
         const bytespaceId = action.bytespaceMemberObj.bytespaceId;
         const userId = action.bytespaceMemberObj.userId;
         const uniqueId = action.bytespaceMemberObj.id;
         newState = { ...state, bytespaceId: { ...state.bytespaceId } };
         newState.bytespaceId[bytespaceId] = {
            userId: userId,
         };
         return newState;
      case REMOVE_FROM_BYTESPACE:
         newState = { ...state, bytespaceId: { ...state.bytespaceId } };
         delete newState.bytespaceId[action.bytespaceMemberObj.userId];
      default:
         return state;
   }
}
