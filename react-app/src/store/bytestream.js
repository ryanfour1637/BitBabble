// Types
const GET_ALL_BYTESTREAMS = "bytestream/GET_ALL_BYTESTREAMS";
const CREATE_BYTESTREAM = "bytestream/CREATE_BYTESTREAM";
const DELETE_BYTESTREAM = "bytestream/DELETE_BYTESTREAM";

// Actions

// bytespaces is an array of all the bytespaces coming from the backend
const actionGetAllBytestreams = (bytestreams) => ({
   type: GET_ALL_BYTESTREAMS,
   bytestreams,
});

// bytespace is a single object coming from the backend
const actionCreateBytestream = (bytestream) => ({
   type: CREATE_BYTESTREAM,
   bytestream,
});

// bytespaceId is the id of the successfully deleted bytespace to be removed from the store
const actionDeleteBytestream = (bytestreamObj) => ({
   type: DELETE_BYTESTREAM,
   bytestreamObj,
});

// Thunks
export const thunkGetAllBytestreams = () => async (dispatch) => {
   const response = await fetch("/api/bytestreams");
   if (response.ok) {
      const data = await response.json();
      dispatch(actionGetAllBytestreams(data));
      return data;
   } else {
      const errors = await response.json();
      return errors;
   }
};

export const thunkCreateBytestream =
   (nameObj, bytespaceId) => async (dispatch) => {
      const response = await fetch(`/api/bytestreams/create/${bytespaceId}`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(nameObj),
      });

      if (response.ok) {
         const data = await response.json();
         dispatch(actionCreateBytestream(data));
         return data.id;
      } else {
         const errors = await response.json();
         return errors;
      }
   };

export const thunkUpdateBytestream =
   (nameObj, bytestreamId) => async (dispatch) => {
      const response = await fetch(`/api/bytestreams/${bytestreamId}/update`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(nameObj),
      });

      if (response.ok) {
         const data = await response.json();
         dispatch(actionCreateBytestream(data));
         return null;
      } else {
         const errors = await response.json();
         return errors;
      }
   };

export const thunkDeleteBytestream = (bytestreamObj) => async (dispatch) => {
   const response = await fetch(`/api/bytestreams/${bytestreamObj.id}/delete`, {
      method: "DELETE",
   });

   dispatch(actionDeleteBytestream(bytestreamObj));

   return null;
};

// Reducer
const initialState = {};
export default function bytestreamsReducer(state = initialState, action) {
   let newState;
   let bytespaceId;
   let bytestreamId;
   switch (action.type) {
      case GET_ALL_BYTESTREAMS:
         newState = {};
         action.bytestreams.forEach((bytestream) => {
            if (!newState[bytestream.bytespaceId]) {
               newState[bytestream.bytespaceId] = {};
               newState[bytestream.bytespaceId][bytestream.id] = bytestream;
            } else {
               newState[bytestream.bytespaceId][bytestream.id] = bytestream;
            }
         });
         return newState;
      case CREATE_BYTESTREAM:
         newState = { ...state };
         if (!newState[action.bytestream.bytespaceId]) {
            newState[action.bytestream.bytespaceId] = {};
            newState[action.bytestream.bytespaceId][action.bytestream.id] =
               action.bytestream;
         } else {
            newState[action.bytestream.bytespaceId][action.bytestream.id] =
               action.bytestream;
         }
         return newState;
      case DELETE_BYTESTREAM:
         ({ bytespaceId, bytestreamId } = action.bytestreamObj);
         newState = { ...state };
         delete newState[bytespaceId][bytestreamId];
         return newState;
      default:
         return state;
   }
}
