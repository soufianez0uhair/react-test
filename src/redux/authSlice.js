import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       logIn(state, action) {
        state.user = action.payload;
       },
       logOut(state) {
        localStorage.removeItem('user');
        state.user = null;    
       }
    }
})

export default authSlice.reducer;
export const selectUser = state => state.auth.user;
export const {logIn, logOut} = authSlice.actions;