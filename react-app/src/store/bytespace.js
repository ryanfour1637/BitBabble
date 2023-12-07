// Types
const GET_ALL_BYTESPACES = "bytespace/GET_ALL_BYTESPACES";
const CREATE_BYTESPACE = "bytespace/CREATE_BYTESPACE";
const DELETE_BYTESPACE = "bytespace/DELETE_BYTESPACE";

// Actions

// bytespaces is an array of all the bytespaces coming from the backend
const actionGetAllBytespaces = (bytespaces) => ({
   type: GET_ALL_BYTESPACES,
   bytespaces,
});

// bytespace is a single object coming from the backend
const actionCreateBytespace = (bytespace) => ({
   type: CREATE_BYTESPACE,
   bytespace,
});

// bytespaceId is the id of the successfully deleted bytespace to be removed from the store
const actionDeleteBytespace = (bytespaceId) => ({
   type: DELETE_BYTESPACE,
   bytespaceId,
});

// Thunks
export const thunkGetAllBytespaces = () => async (dispatch) => {
   const response = await fetch("/api/bytespaces");
   if (response.ok) {
      const data = await response.json();
      dispatch(actionGetAllBytespaces(data));
      return data;
   } else {
      const errors = await response.json();
      return errors;
   }
};

export const thunkCreateBytespace = (nameObj) => async (dispatch) => {
   const response = await fetch(`/api/bytespaces/create`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(nameObj),
   });

   if (response.ok) {
      const data = await response.json();
      dispatch(actionCreateBytespace(data));
      return data.id;
   } else {
      const errors = await response.json();
      return errors;
   }
};

export const thunkUpdateBytespace =
   (nameObj, bytespaceId) => async (dispatch) => {
      const response = await fetch(`/api/bytespaces/${bytespaceId}/update`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(nameObj),
      });

      if (response.ok) {
         const data = await response.json();
         dispatch(actionCreateBytespace(data));
         return null;
      } else {
         const errors = await response.json();
         return errors;
      }
   };

export const thunkDeleteBytespace = (bytespaceId) => async (dispatch) => {
   const response = await fetch(`/api/bytespaces/${bytespaceId}/delete`, {
      method: "DELETE",
   });

   dispatch(actionDeleteBytespace(bytespaceId));

   return null;
};

// Reducer
const initialState = { bytespaces: {} };
export default function bytespaceReducer(state = initialState, action) {
   let newState;
   switch (action.type) {
      case GET_ALL_BYTESPACES:
         newState = { ...state, bytespaces: {} };
         action.bytespaces.forEach(
            (bytespace) => (newState.bytespaces[bytespace.id] = bytespace)
         );
         return newState;
      case CREATE_BYTESPACE:
         newState = { ...state, bytespaces: { ...state.bytespaces } };
         newState.bytespaces[action.bytespace.id] = action.bytespace;
         return newState;
      case DELETE_BYTESPACE:
         newState = { ...state, bytespaces: { ...state.bytespaces } };
         delete newState.bytespaces[action.bytespaceId];
         return newState;
      default:
         return state;
   }
}
