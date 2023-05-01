import axios from "axios";
import { ADDNEW_EXPENSE, DELETE_EXPENSE, GETALL_EXPENSE } from "./type";

const API_URL = "http://localhost:8000";

export const addNewExpense = (data) => async (dispatch) => {
    try {
        const res = await axios.post(`${API_URL}/addExpense`, data);
        dispatch({ type: ADDNEW_EXPENSE, payload: res.data });
    } catch (error) {
        console.log(error);
    }
}

export const getAllExpenses = () => async (dispatch) => {
    try {
        const res = await axios.get(`${API_URL}/getExpenses`);
        dispatch({ type: GETALL_EXPENSE, payload: res.data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteExpense = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`${API_URL}/deleteExpense/${id}`);
        dispatch({ type: DELETE_EXPENSE, payload: res.data });
    } catch (error) {
        console.log(error);
    }
}