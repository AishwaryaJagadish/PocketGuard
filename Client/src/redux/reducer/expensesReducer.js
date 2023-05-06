import * as actionTypes from '../actions/type'

const initialState = {
    expenses: [],
    user: null,
    isFetching: false,
    error: false,
    accesstoken: null,
    totalExpenses: 0
}

export const expensesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADDNEW_EXPENSE:
            return {
                ...state,
                expenses: [action.payload.body, ...state.expenses],
                totalExpenses: state.totalExpenses + action.payload.body.amount
            }
        case actionTypes.GETALL_EXPENSE:
            return {
                ...state,
                expenses: action.payload,
                totalExpenses: action.payload.reduce((total, expense) => total + expense.amount, 0)
            }
        case actionTypes.DELETE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.filter((expense) => expense._id !== action.payload._id),
                totalExpenses: state.totalExpenses - action.payload.amount
            }
        case actionTypes.UPDATE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.map((expense) => expense._id === action.payload.body._id ? action.payload.body : expense),
                totalExpenses: state.totalExpenses - action.payload.oldExpense + action.payload.body.amount
            }
        case actionTypes.LOGIN_START:
            return {
                ...state,
                user: null,
                isFetching: true,
                error: false
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                accesstoken: action.payload.token,
                isFetching: false,
                error: false
            }
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                user: null,
                isFetching: false,
                error: true
            }
        case actionTypes.LOGOUT_USER:
            return initialState
        case actionTypes.UPDATE_BUDGET:
            return {
                ...state,
                user: { ...state.user, budget: action.payload }
            }
        default:
            return state;
    }
}