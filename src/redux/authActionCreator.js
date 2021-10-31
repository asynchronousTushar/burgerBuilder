import * as actionType from './actionTypes';
import axios from 'axios';

export const authSuceess = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}

export const authLoading = isLoading => {
    return {
        type: actionType.AUTH_LOADING,
        payload: isLoading
    }
}

export const authFailed = message => {
    return {
        type: actionType.AUTH_FAILED,
        payload: message
    }
}

export const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");
    return {
        type: actionType.LOG_OUT
    }
}

export const auth = (email, password, mode) => dispatch => {

    dispatch(authLoading(true));

    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }

    let authUrl = null;
    if (mode === "Sign Up") {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    } else {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
    }

    const API_KEY = "AIzaSyCTmttGOxwoMqVPIydgdef2iqFBnv3bBvM"

    axios.post(authUrl + API_KEY, authData)
        .then(response => {
            dispatch(authLoading(false));
            localStorage.setItem("token", response.data.idToken);
            localStorage.setItem("userId", response.data.localId);

            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem("expirationTime", expirationTime);

            dispatch(authSuceess(response.data.idToken, response.data.localId));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFailed(err.response.data.error.message));
            dispatch(authLoading(false));
        })
}

export const authCheck = () => dispatch => {
    const token = localStorage.getItem("token");

    if (!token) {
        //log out
        logOut();
    } else {
        const expirationTime = new Date(localStorage.getItem("expirationTime"));

        if (expirationTime <= new Date()) {
            //log out
            logOut();
        } else {
            const userId = localStorage.getItem("userId");
            dispatch(authSuceess(token, userId));
        }
    }
}