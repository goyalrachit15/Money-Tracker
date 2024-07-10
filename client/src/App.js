import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
    </>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem("user")){
    return props.children;
  }else{
    return <Navigate to="/login" />
  }
}
export default App;
