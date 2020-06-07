import * as actions from '../actions/actionTypes';

const initialState = {
    show: true,
    
};

const addHandler = (state, action) => {
    return {
        ...state,
        show: true
    }
}

const cancelHandler = (state, action) => {
    return {
        ...state,
        show: false
    }
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_HANDLER : return addHandler(state, action)
        case actions.CANCEL_HANDLER : return cancelHandler(state, action)
        default : return state;
    } 
}

export default reducer;