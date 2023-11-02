// Types
const GET_ALL_BYTESPACES = "bytespace/GET_ALL_BYTESPACES";

// Actions

// bytespaces is an array of all the bytespaces coming from the backend
const actionGetAllBytespaces = (bytespaces) => ({
   type: GET_ALL_BYTESPACES,
   bytespaces,
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
      default:
         return state;
   }
}
