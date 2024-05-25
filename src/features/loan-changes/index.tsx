import axiosClient from "@/api/axiosClient";
import { useAppSelector } from "@/app/hooks";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import { ILoanChanges } from "@/models/loan-change";
import { selectAccessToken } from "@/redux/auth-slice";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

interface LoanChangesProps {}

interface CardProps {
  title: string;
  content: string;
  key: keyof ILoanChanges;
}

const LoanChanges: React.FunctionComponent<LoanChangesProps> = () => {
  const accessToken = useAppSelector(selectAccessToken);
  const handleResponseError = useHandleResponseError();

  const [checkboxStates, setCheckboxStates] = useState<ILoanChanges>({
    fix: 1,
    cancel: 1,
    reduce: 1,
    "change io/pi": 1,
    "loan split": 1,
    "loan purpose": 1,
  });

  const cards = useMemo(
    (): CardProps[] => [
      {
        title: "Fix my home loan",
        content:
          "Fix a variable loan. If required, you can also swap from IO to PI repayments as part of this.",
        key: "fix",
      },
      {
        title: "Cancel my fixed rate period - switch to a variable rate",
        content:
          "Break the fixed term on your loan to variabl. Break costs may apply.",
        key: "cancel",
      },
      {
        title: "Reduce my loan limit",
        content:
          "Lower the loan limit of your home loan. This excludes Flexiplus mortgage home loans and fixed home loans.",
        key: "reduce",
      },
      {
        title:
          "Change my interest only repayments to principal and interest repayments",
        content:
          "Convert from an interest only loan to principla and interest repayment.",
        key: "change io/pi",
      },
      {
        title: "Loan split",
        content:
          "Split your home loan into variable and fixed interest rate loans. Each split can be changed to a different product. (for Retail and P&PB originated customer)",
        key: "loan split",
      },
      {
        title: "Change of loan purpose",
        content: "Change your loan between investment and Owner Occupied.",
        key: "loan purpose",
      },
    ],
    []
  );

  const fetchData = useCallback(() => {
    axiosClient
      .post(
        "/api/loanmod/compare.php",
        { modtype: "fix" },
        {
          headers: {
            "access-token": accessToken,
          },
        }
      )
      .then((res) => {
        if (res.data.error === -1) {
          handleResponseError("Xảy ra lỗi khi lấy thông tin");
        } else {
          setCheckboxStates(
            res.data || {
              fix: 1,
              cancel: 1,
              reduce: 1,
              "change io/pi": 1,
              "loan split": 1,
              "loan purpose": 1,
            }
          );
        }
      })
      .catch((e) => {
        console.error(e);
        handleResponseError("Xảy ra lỗi khi lấy thông tin");
      });
  }, [accessToken, handleResponseError]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col items-start w-full max-h-[calc(100vh-80px)] gap-5 px-10 py-4 overflow-auto">
      <h3 className="text-3xl font-semibold">Loan changes</h3>

      <div className="w-full">
        <p className="text-base">
          Available loan change options may update depending on which loan
          change you select.
        </p>
        <p className="text-base">Select loan changes.</p>
      </div>

      <div className="grid w-full grid-cols-3 gap-y-5">
        {cards.map((card) => (
          <div key={`checkbox-${card.key}`} className="col-span-1">
            <div className="max-w-[80%] pb-10 w-[90%] border border-black rounded-xl p-3 flex flex-col items-start justify-between gap-3 h-72">
              <div>
                <p className="text-base font-bold">{card.title}</p>
                <p className="text-base">{card.content}</p>
              </div>
              <label className="container">
                <input
                  type="checkbox"
                  checked={!checkboxStates[card.key]}
                  onChange={(e) => {
                    console.log(e);
                    setCheckboxStates((prev) => ({
                      ...prev,
                      [card.key]: e.target.checked ? 0 : 1,
                    }));
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end w-full gap-3">
        <Link
          to="/home-loan-details"
          className="flex items-center justify-center w-32 h-10 py-2 mt-5 font-bold duration-300 border rounded-md outline-none text-custom-red-1 border-custom-red-1 hover:text-custom-red-2 hover:border-custom-red-2 text-md"
        >
          Back
        </Link>

        <Link
          to="/"
          className="flex items-center justify-center w-32 h-10 py-2 mt-5 font-bold text-white duration-300 border-0 rounded-md outline-none hover:bg-custom-red-2 bg-custom-red-1 text-md"
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default LoanChanges;
