import * as actions from '../actions/actionTypes';
import {updateObject} from '../../Shared/utility'

const initialState = {
    token: null,
    userId: null,
    loading: false,
    error: null,
    isSignup: true
}

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authState = (state, action) => {
    return updateObject(state, {isSignup: !state.isSignup})
}

export const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.AUTH_START : return authStart(state, action);            
        case actions.AUTH_FAIL : return authFail(state, action);
        case actions.AUTH_SUCCESS : return authSuccess(state, action);
        case actions.AUTH_STATE : return authState(state, action)
        default:
            return state;
    }  
}

export default reducer;