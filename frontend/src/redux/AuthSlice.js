import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice ({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success:false,
        },
        logout:{
          isFetching: false,
          error:false,
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state,action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed:(state) =>{
            state.login.isFetching=false;
            state.login.error=true;
        },
        registerStart: (state) => {
            state.register.isFetching = true
        },
        registerSuccess: (state,action) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success=true;
        },
        registerFailed:(state) =>{
            state.register.isFetching=false;
            state.register.error=true;
            state.register.success=false;
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false;
            state.logout.currentUser = null;
            state.logout.error = false;
        },
        logoutFailed:(state) =>{
            state.logout.isFetching=false;
            state.logout.error=true;
        },
        logoutStart :(state) => {
            state.logout.isFetching = true;
            state.logout.error=false;
        }
    }
})
export const {
    loginStart, loginFailed, loginSuccess,
    registerFailed,registerSuccess,registerStart,
    logoutStart,logoutSuccess,logoutFailed,
} = authSlice.actions;
export default authSlice.reducer;