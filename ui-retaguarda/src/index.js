import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import UsuariosPage from "./pages/UsuariosPage";
import EmpresasPage from "./pages/EmpresasPage";
import TemplatesPage from "./pages/TemplatesPage";
import IncludesPage from "./pages/IncludesPage";
import TestApi from "./components/TestApi";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/testApi" element={<TestApi />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/auth/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/usuarios" element={<UsuariosPage />} />
                <Route path="/empresas" element={<EmpresasPage />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="/includes" element={<IncludesPage />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
