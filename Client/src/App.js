import { Navigate, Route, Routes } from "react-router-dom";
import Budget from "./components/Budget";
import Expenses from "./components/Expenses";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import { useSelector } from "react-redux";
import Prediction from "./components/Prediction";

function App() {
  const user = useSelector(state => state.expenses.user)
  return (
    <>
    <Routes>
      <Route path = "/" element = {user? <Budget/>: <Navigate to ="/login"/>}/>
      <Route path = "/login" element = {user?<Navigate to="/"/>: <Signin/>}/>
      <Route path = "/predictions" element = {user? <Prediction/>: <Navigate to ="/login"/>}/>
    </Routes>
    </>
  );
}

export default App;
