import * as actionTypes from '../actions/type'

const initialState = {
    expenses: []
}

export const expensesReducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.ADDNEW_EXPENSE:
            // return [action.payload, ...state]
            return {
                ...state,
                expenses: [action.payload.body, ...state.expenses]
            }
        case actionTypes.GETALL_EXPENSE:
            return {
                ...state,
                expenses: action.payload
            }
        case actionTypes.DELETE_EXPENSE:
            // return state.filter((expense) => expense._id !== action.payload._id)
            return {
                ...state,
                expenses: state.expenses.filter((expense) => expense._id !== action.payload._id)
            }
        default:
            return state;
    }
}