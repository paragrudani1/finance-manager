import * as actions from './actionTypes';
import axios from 'axios';
import { cancelLoading, startLoading } from './InputContainer';

export const authStart = () => {
  return {
      type: actions.AUTH_START
  }
}

export const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actions.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const signUp = (name, email, password) => {
  return dispatch => {
    dispatch(authStart());
    const SignupAuthData = {
        name: name,
        email: email,
        password: password,
        returnSecureToken: true
    };
    dispatch(startLoading())
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDlwhrT6DRDBMQz9LB1vvUbMKhnryUCG8'
    axios.post(url, SignupAuthData)
        .then(response => {
            dispatch(cancelLoading())
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(err => {
            dispatch(cancelLoading())
            dispatch(authFail(err.response.data.error));
        });
    
  }
}

export const Login = (email, password) => {
  return dispatch => {
    const LoginAuthData = {
      email: email,
      password: password,
      returnSecureToken: true
  };

  dispatch(authStart())
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDlwhrT6DRDBMQz9LB1vvUbMKhnryUCG8';

  axios.post(url, LoginAuthData)
        .then(response => {
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
}

}