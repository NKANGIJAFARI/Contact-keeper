import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";
import axios from "axios";

import setAuthToken from '../../utils/setAuthToken'


import { 
   REGISTER_FAIL,
   REGISTER_SUCCESS,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_FAIL,
   LOGIN_SUCCESS,
   LOGOUT,
   CLEAR_ERRORS
} from "../types";



const AuthState = props =>{
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: false,
        loading: true,
        error: null,
        user: null,
    }

    const [state, dispatch] = useReducer(authReducer, initialState);


    //Load Users
    const loadUser = async() =>{
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (error) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }


    //Register Users
    const register = async (formData) =>{

        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config);
            console.log(res.data)
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })

            loadUser()

        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
            
        }
    }


    //Login User
    const logIn = async (formData) =>{
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', formData, config);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
             loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }
    }


    //Logout
    const logOut = () =>{
        dispatch({
            type: LOGOUT
        })
    }

    //Clear Errors
    const clearErrors = () =>{
        dispatch({
            type: CLEAR_ERRORS,
        })
    }

    return <AuthContext.Provider value={
        {
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            logIn, 
            logOut,
            clearErrors,
            loadUser
        }
    }>
        {props.children}
    </AuthContext.Provider>
}

export default AuthState;