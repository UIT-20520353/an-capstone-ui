import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "@/features/login";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
