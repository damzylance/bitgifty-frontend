import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import Dashboard from "../Pages/Dashboard";
import Giftcard from "../Pages/Dashboard/Giftcard";
import Wallet from "../Pages/Dashboard/Wallet";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/giftcard" element={<Giftcard />} />
        <Route exact path="/wallet" element={<Wallet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
