import * as actionTypes from '../actions/type'

export const expensesReducer = (state=[], action) => {
    switch (action.type) {
        case actionTypes.ADDNEW_EXPENSE:
            return [action.payload, ...state]
        default:
            return state;
    }
}