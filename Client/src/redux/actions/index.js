import axios from "axios";
import { ADDNEW_EXPENSE, DELETE_EXPENSE, GETALL_EXPENSE, LOGIN_SUCCESS, LOGIN_START, LOGIN_FAILURE, LOGOUT_USER, UPDATE_BUDGET  } from "./type";
import { loginFailure, loginStart, loginSuccess } from "../userSlice";

const API_URL = "http://localhost:8000";

export const addNewExpense = (data) => async (dispatch) => {
    try {
        const res = await axios.post(`${API_URL}/addExpense`, data, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
        console.log(res.data)
        dispatch({ type: ADDNEW_EXPENSE, payload: res.data });
    } catch (error) {
        console.log(error);
    }
}

export const getAllExpenses = () => async (dispatch) => {
    try {
        const res = await axios.get(`${API_URL}/getExpenses`, { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } });
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

export const login = (data) => async (dispatch) => {
    dispatch({ type: LOGIN_START });
    try {
        const res = await axios.post(`${API_URL}/auth/login`, data);
        console.log(res.data)
        localStorage.setItem('access_token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE});
        console.log(error);
    }
}

export const register = (data) => async (dispatch) => {
    dispatch({ type: LOGIN_START });
    try {
        const res = await axios.post(`${API_URL}/auth/register`, data);
        console.log(res.data)
        localStorage.setItem('access_token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE});
        console.log(error);
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT_USER});
}

export const updateBudget = (data) => async (dispatch) => {
    try {
        const res = await axios.put(`${API_URL}/auth/updateBudget`, { budget: data });
        dispatch({ type: UPDATE_BUDGET, payload: data});
    } catch (error) {
        console.log(error);
    }
}