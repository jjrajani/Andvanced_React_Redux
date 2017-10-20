import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';
// ROOT_URL dependent upon Server_Side_Authentication dir in Development/Udemy/Advanced_React-Redux
const ROOT_URL = 'http://localhost:3090';

// redux-thunk allows us to return a function instead of an action to redux dispatch
export function signinUser({ email, password }) {
    return function(dispatch) {
        axios
            .post(`${ROOT_URL}/signin`, { email, password })
            .then(res => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', res.data.token);
                browserHistory.push('/feature');
            })
            .catch(err => {
                dispatch(authError('bad login info'));
            });
    };
}

export function signup({ email, password }) {
    return function(dispatch) {
        axios
            .post(`${ROOT_URL}/signup`, { email, password })
            .then(res => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', res.data.token);
                browserHistory.push('/feature');
            })
            .catch(({ response }) => {
                dispatch(authError(response.data.error));
            });
    };
}

export function signOut() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function fetchMessage() {
    return function(dispatch) {
        axios
            .get(ROOT_URL, {
                headers: { authorization: localStorage.getItem('token') }
            })
            .then(res => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: res.data.message
                });
            })
            .catch(err => {
                console.log('err', err);
            });
    };
}
