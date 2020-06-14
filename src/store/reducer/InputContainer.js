import * as actions from '../actions/actionTypes';

const initialState = {
    status: [],
    expanse: false,
    totalExpanse: 0,
    totalIncome:  0,
    deleting: false,
    loading: false,
}

const startLoading = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const cancelLoading = (state, action) => {
    return {
        ...state,
        loading: false
    }
}

const storeExpanse = (state, action) => {
    
    return {
        ...state,
        status: action.status,
        expanse: true,
        loading: false
    }
}

const storeIncome = (state, action) => {
    return {
        ...state,
        status: action.status,
        expanse: false,
        loading: false
    }
}


const updateAmount = (state, action) => {
    return {
        ...state,
        totalExpanse: action.expanse,
        totalIncome: action.income
    }
}






const updateEdit = (state, action) => {
    

    const test = state.status.filter(e => {
        if(e.timeStamp === +action.timeStamp) {
            e.description = action.description
            e.amount = action.amount;
        }
        
        return e
    })

    return {
        ...state,
        status: test
    }
}


const deleteData = (state, action) => {

    return {
        ...state,
        status: state.status.filter(result => result.timeStamp !== action.dataIndex)
    }
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.STORE_EXPANSE : return storeExpanse(state, action);
        case actions.STORE_INCOME : return storeIncome(state, action);
        case actions.UPDATE_EDIT : return updateEdit(state, action);
        case actions.DELETE_DATA : return deleteData(state, action);
        case actions.START_LOADING : return startLoading(state, action);
        case actions.CANCEL_LOADING : return cancelLoading(state, action);
        case actions.UPDATE_AMOUNT : return updateAmount(state, action)
        default : return state
    }
}

export default reducer;