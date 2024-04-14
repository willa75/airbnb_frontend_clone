import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../components/pages/home";
import RegisterPage from '../components/pages/Register';
import AuthProvider from "../context/auth";
import ConfirmSignUpModal from "../components/modals/ConfirmSignUpModal";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import Navbar from "../components/navbar/Navbar";
import ToasterProvider from "../providers/ToasterProvider";
import ProtectedRoutes from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <ConfirmSignUpModal />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="test" element={<HomePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
