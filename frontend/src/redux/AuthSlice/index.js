import { createSlice } from "@reduxjs/toolkit";
import { removeLocalStorageToken } from "../../utils/common.util";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userData: {},
        signUpData: {}
    },
    reducers: {
        loginAction: (state, action) => {
            return (state = {
                ...state,
                userData: { ...action.payload },
                signUpData: {}
            })
        },
        logoutAction: (state, action) => {
            return (state = {
                ...state,
                userData: {}
            })
        }
    }
});

export const {
    loginAction,
    logoutAction
} = authSlice.actions;

export const login = (data) => async (dispatch) => {
    try {
        dispatch(loginAction(data))
    }
    catch (err) {

    }
}

export const logout = (navigate,userRole)=> async (dispatch) => {
    try {
        removeLocalStorageToken();
        dispatch(logoutAction());
    
    } catch (error) {

    }
}



export const selectUserData=(state)=>state.auth.userData


export default authSlice.reducer;