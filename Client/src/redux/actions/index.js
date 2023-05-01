import axios from "axios";
import { ADDNEW_EXPENSE } from "../constants/action-types";

const API_URL = "http://localhost:8000";

export const addNewExpense = (data) => async (dispatch) => {
    try {
        const res = await axios.post(`${API_URL}/expenses`, data);
        dispatch({ type: ADDNEW_EXPENSE, payload: res.data });
    } catch (error) {
        console.log(error);
    }
}