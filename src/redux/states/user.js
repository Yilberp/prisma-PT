import { createSlice } from "@reduxjs/toolkit";
import { clearLocalStorage, setLocalStorage, UserKey } from "../../utilities/localStorage";

export const EmptyUserState = {
    login: false,
    username: "",
    email: "",
    mensaje: ""
}
export const userSlice = createSlice({
    name: 'user',
    initialState: localStorage.getItem(UserKey) ? JSON.parse(localStorage.getItem(UserKey)) : EmptyUserState,
    reducers: {
      createUser: (state, action) => {
        setLocalStorage(UserKey, action.payload);
        return action.payload;
      },
      updateUser: (state, action) => {
        const result = { ...state, ...action.payload };
        setLocalStorage(UserKey, result);
        return result;
      },
      resetUser: () => {
        clearLocalStorage(UserKey);
        return EmptyUserState;
      }
    }
  });
  
  export const { createUser, updateUser, resetUser } = userSlice.actions;
  
  export default userSlice.reducer;