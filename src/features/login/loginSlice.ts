import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface IloginState {
    loginInputIsValid?: boolean,
    userExists?:  boolean ,
    signupInputIsValid?: boolean,
}
const initialState : IloginState = {
    loginInputIsValid: undefined,
    userExists: undefined,
    signupInputIsValid: undefined,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        loginStateHandler: (state, action) => {
            state.loginInputIsValid = action.payload;
        },
        signupStateHandler: (state, action) => {
            state.signupInputIsValid = action.payload;
        },
        userStateHandler: (state, action) => {
            state.userExists = action.payload;
        },
    },
});


export const { 
    loginStateHandler,
    signupStateHandler,
    userStateHandler, 
   } = loginSlice.actions;


export const selectLogin = (state: RootState) => state.login;


export default loginSlice.reducer;