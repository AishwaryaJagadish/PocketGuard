import * as actionTypes from '../actions/type'

export const expensesReducer = (state=[], action) => {
    switch (action.type) {
        case actionTypes.ADDNEW_EXPENSE:
            return [action.payload, ...state]
        case actionTypes.GETALL_EXPENSE:
            return action.payload
        case actionTypes.DELETE_EXPENSE:
            return state.filter((expense) => expense._id !== action.payload._id)
        default:
            return state;
    }
}