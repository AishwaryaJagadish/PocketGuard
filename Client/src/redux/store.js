import { configureStore } from '@reduxjs/toolkit';
import { expensesReducer } from './reducer/expensesReducer';
import  userReducer from './userSlice';
import thunk from "redux-thunk";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
