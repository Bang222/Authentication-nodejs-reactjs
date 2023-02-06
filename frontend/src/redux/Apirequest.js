import axios from './basiclink'
import {
    loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess,
    registerFailed, registerStart, registerSuccess
} from "./AuthSlice";
import {
    deleteUsersFailed,
    deleteUserStart,
    deleteUserSuccess,
    getUserFailed,
    getUserStart,
    getUserSuccess
} from "./userSlice";

export const loginUser = async (Users, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("auth/login", Users)
        dispatch(loginSuccess(res.data));
        navigate("/")
    } catch (err) {
        dispatch(loginFailed())
    }
}
export const registerUser = async (Users, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post("auth/register", Users)
        dispatch(registerSuccess())
        navigate("/login")

    } catch (err) {
        dispatch(registerFailed())
    }
}
export const getAllUser = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUserStart());
    try {
        const res = await axiosJWT.get("http://localhost:8000/user/list-data-user", {
            headers: {token: `Bearer ${accessToken}`},
        })
        dispatch(getUserSuccess(res.data))
    } catch (err) {
        dispatch(getUserFailed())
    }
}
export const deteleUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUserStart())
    try {
        const res = await axiosJWT.delete("http://localhost:8000/user/" + id, {
            headers: {token: `Bearer ${accessToken}`}
        })
        dispatch(deleteUserSuccess("res.data"))
    } catch (err) {
        dispatch(deleteUsersFailed(err.response))
    }
};
export const logout = async (dispatch,id,navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post("http://localhost:8000/auth/logout",id,{
            headers:{token: `Bearer ${accessToken}`}
        })
        dispatch(logoutSuccess())
    } catch (err) {
        dispatch(logoutFailed())
    }
}