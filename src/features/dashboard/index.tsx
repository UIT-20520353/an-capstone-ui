import React, { useMemo } from "react";
import { Link } from "react-router-dom";

interface DashboardProps {}

const Dashboard: React.FunctionComponent<DashboardProps> = () => {
  const items = useMemo(
    (): string[] => [
      "Fix my home loan",
      "Cancle my fixed rate period - switch to a variable rate",
      "Reduce my loan limit",
      "Change my interest only repayments to principal and interest repayments",
      "Loan split",
      "Loan consolidation to the same or longer term",
      "Change of loan purpose",
      "Change  to a different prodcut",
      "Add/remove or change NAB offset arrangement",
      "Add/remove a Choice Package or Private Tailored Package",
    ],
    []
  );

  return (
    <div className="flex flex-col items-start w-full gap-5 px-10 py-4">
      <h3 className="text-3xl font-semibold">Getting started</h3>

      <div className="flex flex-col items-start w-full gap-3">
        <p className="text-lg">
          Start making change that do not require a credit assessment
        </p>
        <ul className="space-y-1 list-decimal list-inside">
          {items.map((i, index) => (
            <li key={`step-${index}`} className="text-base">
              {i}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-end w-full">
        <Link
          to="/banker-details"
          className="border-0 outline-none flex items-center  justify-center w-32 h-10 py-2 mt-5 font-bold !text-white duration-300 rounded-md hover:!bg-custom-red-2 !bg-custom-red-1 text-md"
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
