import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Page } from "../types/routes";
import HomePage from "../components/pages/home";
import AuthProvider from "../context/auth";
import ConfirmSignUpModal from "../components/modals/ConfirmSignUpModal";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import Navbar from "../components/navbar/Navbar";
import ToasterProvider from "../providers/ToasterProvider";

export const pages: Page[] = [
  { path: "/", exact: true, isProtected: false, component: HomePage },
];

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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
