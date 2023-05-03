import { Navigate, Route, Routes } from "react-router-dom";
import Budget from "./components/Budget";
import Expenses from "./components/Expenses";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(state => state.expenses.user)
  return (
    <>
    <Routes>
      <Route path = "/" element = {user? <Budget/>: <Navigate to ="/login"/>}/>
      <Route path = "/login" element = {user?<Navigate to="/"/>: <Signin/>}/>
    </Routes>
    </>
  );
}

export default App;
