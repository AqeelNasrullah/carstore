import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./contexts/auth-context";
import Routes from "./pages/Routes";

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
          <ToastContainer
            position="top-right"
            theme="colored"
            hideProgressBar={true}
          />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
