import { Routes, Route, Navigate } from "react-router-dom";
import UserManage from "../features/UserManage";
import Login from "../features/Login";
import Home from "../features/Home";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path={"/home"} element={<Home />} />
        <Route path="/users" element={<UserManage />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
