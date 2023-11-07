import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./assets/components/Login/Login";
import Register from "./assets/components/Register/Register";
import OTP from "./assets/components/Register/Otp_page";

import "./App.css";
import ResetPassword from "./assets/components/Password/ResetPassword";
import Password from "./assets/components/Password/Password";
import Dashboard from "./assets/components/Dashboard/UserDashboard/Dashboard";
import Token from "./assets/components/Token/Token";
import VerifyMessage from "./assets/components/Token/VerifyMessage";
import Logout from "./assets/components/Dashboard/Logout/Logout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/confirm-link" element={<Password />} />

        <Route path="/user-auth" element={<Token />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify-message" element={<VerifyMessage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
