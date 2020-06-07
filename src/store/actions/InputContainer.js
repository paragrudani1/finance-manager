import * as actions from './actionTypes';
import { cancelHandler } from './Dashboard';

export const updateExpanse = () => {
    return {
        type: actions.UPDATE_EXPANSE
    }
}

export const updateIncome = () => {
    return {
        type: actions.UPDATE_INCOME
    }
}

export const SaveItem = () => {
    return {
        type: actions.SAVE_ITEMS,
    }
}


export const saveExpanse = () => {
    return {
        type: actions.SAVE_EXPANSE
    }
}

export const saveIncome = () => {
    return {
        type: actions.SAVE_INCOME
    }
}

export const storeExpanseDetail = (description, amount, color) => {
return {
        type: actions.STORE_EXPANSE_DETAIL,
        description: description,
        amount: amount,
        color: color,
    }
}

export const storeIncomeDetail = (description, amount, color) => {
    return {
        type: actions.STORE_INCOME_DETAIL,
        description: description,
        amount: amount,
        color: color,
    }
}

export const updateTotalExpanse = (description, amount, color, ) => {
    return dispatch => {
        dispatch(storeExpanseDetail(description, amount, color))
        dispatch(updateExpanse())
        dispatch(cancelHandler())
        dispatch(SaveItem())
        dispatch(saveExpanse())
    }
}

export const updateTotalIncome = (description, amount, color, ) => {
    return dispatch => {
        dispatch(storeIncomeDetail(description, amount, color))
        dispatch(updateIncome())
        dispatch(cancelHandler())
        dispatch(SaveItem())
        dispatch(saveIncome())
    }
}

export const updateEdit = (timeStamp, description, amount) => {
    return {
        type: actions.UPDATE_EDIT,
        timeStamp: timeStamp,
        description: description,
        amount: amount
    }
}


export const updateDataOnEdit = (timeStamp, description, amount) => {
    return dispatch => {
        dispatch(updateEdit(timeStamp, description, amount));
        dispatch(updateExpanse());
        dispatch(updateIncome())
        dispatch(SaveItem())
        dispatch(saveExpanse())
        dispatch(saveIncome())
    }
}

export const deleteData = (dataIndex) => {
    return {
        type: actions.DELETE_DATA,
        dataIndex: dataIndex
    }
} 


export const updateDataOnDelete = (dataIndex) => {
    return dispatch => {
        dispatch(deleteData(dataIndex))
        dispatch(updateExpanse());
        dispatch(updateIncome())
        dispatch(SaveItem())
        dispatch(saveExpanse())
        dispatch(saveIncome())
    }
}