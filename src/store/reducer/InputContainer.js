import * as actions from '../actions/actionTypes';

const initialState = {
    status : localStorage.getItem('status') ? JSON.parse(localStorage.getItem('status')) : [],
    expanse: false,
    totalExpanse:  localStorage.getItem('totalExpanse') ? JSON.parse(localStorage.getItem('totalExpanse')) : 0,
    totalIncome: localStorage.getItem('totalIncome') ? JSON.parse(localStorage.getItem('totalIncome')) : 0
}

const storeExpanseDetail = (state, action) => {
    
    return {
        ...state,
        status: state.status.concat({ description: action.description, amount: action.amount, expanse: true, bgColor: action.color,updateTime: new Date().toLocaleTimeString(), timeStamp: new Date().getTime()}),
        expanse: true,
    }
}

const storeIncomeDetail = (state, action) => {
    
   
    return {
        ...state,
        status: state.status.concat({ description: action.description, amount: action.amount, income: true, bgColor: action.color, updateTime: new Date().toLocaleTimeString(), timeStamp: new Date().getTime()}),
        expanse: false,
    }
}

const updateExpanse = (state, action) => {
    let expanses = [];
    
    Object.entries(state.status).map(el => el[1]).filter(e => {
        if(e.expanse === true) {
            expanses.push(Number(e.amount))
        }
        return true
    })

    return {
        ...state,
        totalExpanse: expanses.reduce((a,b) => { return a + b}, 0),
    }
}

const saveExpanse = (state, action) => {
    const saveExpanse = localStorage.setItem('totalExpanse', state.totalExpanse)
    return {
        ...state,
        saveExpanse
    }
}



const updateIncome = (state, action) => {
    let incomes = [];
    
    Object.entries(state.status).map(el => el[1]).filter(e => {
        if(e.income === true) {
             incomes.push(Number(e.amount))
            }
            return true      
    })
    
    
    return {
        ...state,
        totalIncome: incomes.reduce((a,b) => { return a + b}, 0)
    }
}

const saveIncome = (state, action) => {
    const saveIncome = localStorage.setItem('totalIncome', state.totalIncome)
    return {
        ...state,
        saveIncome
    }
}

const updateEdit = (state, action) => {
    

    const test = state.status.filter(e => {
        if(e.timeStamp === +action.timeStamp) {
            e.description = action.description
            e.amount = action.amount;
            console.log(e);
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

export const SaveItem = (state, action) => {
    const saveItem = localStorage.setItem('status', JSON.stringify(state.status));
    return {
        ...state,
        saveItem
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.STORE_EXPANSE_DETAIL : return storeExpanseDetail(state, action);
        case actions.STORE_INCOME_DETAIL : return storeIncomeDetail(state, action);
        case actions.UPDATE_EXPANSE : return updateExpanse(state, action);
        case actions.UPDATE_INCOME : return updateIncome(state, action);
        case actions.UPDATE_EDIT : return updateEdit(state, action);
        case actions.DELETE_DATA : return deleteData(state, action);
        case actions.SAVE_ITEMS : return SaveItem(state, action);
        case actions.SAVE_EXPANSE : return saveExpanse(state, action)
        case actions.SAVE_INCOME : return saveIncome(state, action)
        default : return state
    }
}

export default reducer;