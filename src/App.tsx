import MainLayout from "@/components/layouts/main-layout";
import BankderDetails from "@/features/banker-details";
import Dashboard from "@/features/dashboard";
import HomeLoanDetails from "@/features/home-loan-details";
import LoanChanges from "@/features/loan-changes";
import LoginPage from "@/features/login";
import Review from "@/features/review/review";
import React from "react";
import { Route, Routes } from "react-router-dom";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="banker-details" element={<BankderDetails />} />
        <Route path="home-loan-details" element={<HomeLoanDetails />} />
        <Route path="loan-changes" element={<LoanChanges />} />
        <Route path="review" element={<Review />} />
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
