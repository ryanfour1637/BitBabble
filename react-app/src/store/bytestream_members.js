// Types

const ADD_TO_BYTESTREAM = "bytestream_members/ADD_TO_BYTESTREAM";
const REMOVE_FROM_BYTESTREAM = "bytestream_members/REMOVE_FROM_BYTESTREAM";

// Actions

const actionAddToBytestream = (bytestreamMemberObj) => ({
   type: ADD_TO_BYTESTREAM,
   bytestreamMemberObj,
});

const actionRemoveFromBytestream = (bytestreamMemberObj) => ({
   type: REMOVE_FROM_BYTESTREAM,
   bytestreamMemberObj,
});

// Thunks

export const thunkAddToBytestream = (bytestreamId) => async (dispatch) => {
   const response = await fetch(
      `/api/bytestream_members/bytestreams/${bytestreamId}/add_user`,
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

// Reducer

const initialState = {};
export default function bytestreamMembersReducer(state = initialState, action) {
   let newState;
   let bytestreamId;
   let userId;
   let id;
   switch (action.type) {
      case ADD_TO_BYTESTREAM:
         ({ bytestreamId, userId, id } = action.bytestreamMemberObj);
      // need to get the bytespace Id from the bytepaceleftbar index.js to pass in here.
   }
}
