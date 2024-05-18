import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "@/features/login";
import Dashboard from "./features/dashboard";
import MainLayout from "./components/layouts/main-layout";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
