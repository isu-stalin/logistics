import React, { useEffect, useState } from "react";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/index";
import { Admin, Cashier, Manager, User } from "./pages/role/index";
import Users from "./components/admin/users";

const App = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else if (token && role === "ROLE_ADMIN") {
      navigate("/dashboard");
      setAdmin("admin");
    } else if (token && role === "ROLE_MANAGER") {
      navigate("/manager-dashboard");
    } else if (token && role === "ROLE_USER") {
      navigate("/user-dashboard");
    } else if (token && role === "ROLE_CASHIER") {
      navigate("/cashier-dashboard");
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route>
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/users" element={<Users />} />
      </Route>
      <Route path="/manager-dashboard" element={<Manager />} />
      <Route path="/user-dashboard" element={<User />} />
      <Route path="/cashier-dashboard" element={<Cashier />} />
    </Routes>
  );
};

export default App;
