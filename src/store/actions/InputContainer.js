/** @format */

import * as actions from "./actionTypes";
import axios from "../../axios";
import { cancelHandler } from "./Dashboard";
import { authFail } from "./auth";
import {updateObject} from '../../Shared/utility'

export const startLoading = () => {
  return {
    type: actions.START_LOADING
  }
}

export const cancelLoading = () => {
  return {
    type:actions.CANCEL_LOADING
  }
}

export const storeExpanse = (status) => {
    return {
      type: actions.STORE_EXPANSE,
      status: status
    };
  };
  
  
  export const storeIncome = (status) => {
    return {
      type: actions.STORE_INCOME,
      status: status
    };
  };
  
  export const deleteData = (dataIndex) => {
    return {
      type: actions.DELETE_DATA,
      dataIndex: dataIndex,
    };
  };

  export const updateAmount = (expanse, income) => {
    return {
      type: actions.UPDATE_AMOUNT,
      expanse: expanse,
      income: income
    }
  }
  
export const updateEdit = (timeStamp, description, amount) => {
    return {
      type: actions.UPDATE_EDIT,
      timeStamp: timeStamp,
      description: description,
      amount: amount,
    };
  };  

  export const fetchData = (token, userId) => {
    return dispatch => {
      dispatch(startLoading())
      const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"'
      axios.get('./list.json' + queryParams)
        .then(list => {
          const fetchedData = [];
          for ( let key in list.data ) {
            fetchedData.push( {
              ...list.data[key]
            });
          }
          dispatch(storeExpanse(fetchedData))
          dispatch(storeIncome(fetchedData))
        }).catch(err => {
          console.log(err);
          dispatch(cancelLoading())
          dispatch(authFail(err))
        })
    }
  }


export const updateTotalAmount = (token, userId) => {
    return dispatch => {
      const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"'
        axios.get('./list.json' + queryParams)
        .then(list => {
            const expanse = [];
            const income = [];
                Object.entries(list.data).map(el => el[1]).filter(e => {
                  console.log(e);
                  
                   const fetchExpanse = e.data.expanse === true ? expanse.push(Number(e.data.amount)) : true;
                   const fetchIncome = e.data.income === true ? income.push(Number(e.data.amount)) : true;
                })
                let totalExpanse = expanse.reduce((a,b) => { return a + b}, 0);
                let totalIncome = income.reduce((a,b) => { return a + b}, 0);
                
            dispatch(updateAmount(totalExpanse, totalIncome))   
           })
        .catch(err => {
            return err;
        })
    }
}


export const storeTotalExpanse = (description, amount, color, id, token) => {
  return (dispatch) => {
    const list = {
      data: {
        description: description,
        amount: amount,
        expanse: true,
        bgColor: color,
        updateTime: new Date().toLocaleTimeString(),
        timeStamp: new Date().getTime(),
        date: new Date(),
      },
    }; 


    const newList = updateObject(list, {userId: id, amount: amount})
    
    dispatch(startLoading())
    axios.post("/list.json?auth=" + token, newList)
    .then(list => {
        dispatch(cancelHandler())
    }).catch(err => {
       console.log(err);
       dispatch(authFail(err))
    })
  };
};

export const storeTotalIncome = (description, amount, color, id, token) => {
  return (dispatch) => {
    const list = {
      data : {
        description: description,
        amount: amount,
        income: true,
        bgColor: color,
        updateTime: new Date().toLocaleTimeString(),
        timeStamp: new Date().getTime(),
        date: new Date()
      }
      };
      const newList = updateObject(list, {userId: id, amount: amount})
      
      dispatch(startLoading());
      axios.post("/list.json?auth=" + token, newList)
      .then(list => {
          dispatch(cancelHandler())
      })
      .catch(err => err)

  };
};


export const updateDataOnEdit = (timeStamp, description, amount) => {
  return (dispatch) => {
    dispatch(updateEdit(timeStamp, description, amount));
  };
};



export const updateDataOnDelete = (dataIndex) => {
  return (dispatch) => {
    dispatch(deleteData(dataIndex));
  };
};
