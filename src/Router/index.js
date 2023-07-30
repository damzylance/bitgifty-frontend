import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import ConfirmEmail from "../Pages/Signup/ConfirmEmail";
import UserSetting from "../Pages/UserSetting";
import Dashboard from "../Pages/Dashboard";
import Giftcard from "../Pages/Dashboard/Giftcard";
import Wallet from "../Pages/Dashboard/Wallet";
import History from "../Pages/Dashboard/History";
import Reset from "../Pages/Reset/Reset";
import PasswordResetConFirm from "../Pages/ChangePassword/ChangePassword";
import CoinDetails from "../Pages/Dashboard/Wallet/Wallet";
import Home from "../Pages";
import Notfound from "../Pages/404";
import ContactUs from "../Pages/Contact";
import Payout from "../Pages/UserSetting/Payout";
import SwapHistory from "../Pages/Dashboard/Wallet/SwapHistory";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact-us" element={<ContactUs />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Signup />} />
        <Route
          exact
          path="/auth/email-confirm/:token"
          element={<ConfirmEmail />}
        />
        <Route exact path="/password-reset" element={<Reset />} />
        <Route
          exact
          path="/auth/password/password-reset-confirm/:uid/:token"
          element={<PasswordResetConFirm />}
        />

        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/giftcard" element={<Giftcard />} />
        <Route exact path="/giftcard/:page" element={<Giftcard />} />

        <Route exact path="/wallet" element={<Wallet />} />
        <Route exact path="/coin-details/:currency" element={<CoinDetails />} />
        <Route exact path="/history" element={<History />} />
        <Route exact path="/history" element={<History />} />
        <Route exact path="/swap-history" element={<SwapHistory />} />
        <Route exact path="/setting" element={<UserSetting />} />
        <Route exact path="/setting/payout" element={<Payout />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
