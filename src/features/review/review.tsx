import { useAppSelector } from "@/app/hooks";
import SkeletonLoader from "@/components/common/skeleton-loader";
import { IHomeLoadDetails } from "@/models/home-loan-details";
import { ILoanChanges } from "@/models/loan-change";
import {
  selectCheckboxStates,
  selectHomeLoanDetails,
} from "@/redux/global-slice";
import React, { useMemo } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

interface ReviewProps {}

interface InforProps {
  label: string;
  dataIndex: keyof IHomeLoadDetails;
}

interface CardProps {
  title: string;
  content: string;
  key: keyof ILoanChanges;
}

const Review: React.FunctionComponent<ReviewProps> = () => {
  const homeLoanDetails = useAppSelector(selectHomeLoanDetails);
  const checkboxStates = useAppSelector(selectCheckboxStates);

  const anotherInfors = useMemo(
    (): InforProps[] => [
      {
        label: "Loan account number",
        dataIndex: "loanAcc",
      },
      {
        label: "Current balance",
        dataIndex: "currentBalance",
      },
      {
        label: "Product name",
        dataIndex: "productName",
      },
      {
        label: "Assurance attachment",
        dataIndex: "AssuranceAttachment",
      },
      {
        label: "Rate type",
        dataIndex: "RateType",
      },
      {
        label: "Interest rate per annum",
        dataIndex: "inrestRate",
      },
      {
        label: "Offset account number",
        dataIndex: "offsetAcc",
      },
      {
        label: "Loan purpose",
        dataIndex: "loanPurpose",
      },
    ],
    []
  );

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

  return (
    <div className="flex flex-col items-start w-full max-h-[calc(100vh-80px)] gap-5 px-10 py-4 overflow-auto">
      <h3 className="text-3xl font-semibold">Review</h3>

      <div className="flex flex-col items-start w-full gap-3">
        <p className="text-xl font-semibold">Banker details</p>
        <div className="grid w-full grid-cols-2 gap-y-3">
          <div className="flex flex-col col-span-1 gap-2">
            <p className="text-base font-semibold">Banker name</p>
            <p className="text-base">Andie Chan</p>
          </div>

          <div className="flex flex-col col-span-1 gap-2">
            <p className="text-base font-semibold">Banker email</p>
            <p className="text-base text-red-500">Andie.Tran@gmail.com</p>
          </div>

          <div className="flex flex-col col-span-1 gap-2">
            <p className="text-base font-semibold">Banker area</p>
            <p className="text-base">Retail</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start w-full gap-3">
        <p className="text-xl font-semibold">Home loan details</p>
        <div className="grid w-full grid-cols-2 gap-y-3">
          {anotherInfors.map((infor, index) => (
            <div
              key={`another-infor-${index}`}
              className="flex flex-col items-start col-span-1"
            >
              <p className="text-base font-semibold">{infor.label}</p>
              {homeLoanDetails ? (
                <p className="text-base">
                  {infor.dataIndex === "currentBalance" ? (
                    <NumericFormat
                      value={homeLoanDetails.currentBalance}
                      prefix="$"
                      thousandSeparator=","
                      displayType="text"
                    />
                  ) : (
                    homeLoanDetails[infor.dataIndex]
                  )}
                </p>
              ) : (
                <SkeletonLoader width={250} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start w-full gap-3">
        <p className="text-xl font-semibold">Loan changes</p>
        <div className="grid w-full grid-cols-1 gap-y-3">
          {cards.map(
            (item) =>
              checkboxStates[item.key] === 0 && (
                <div className="flex flex-col col-span-1 gap-2">
                  <p className="text-base font-semibold">{item.title}</p>
                  <p className="text-base">{item.content}</p>
                </div>
              )
          )}
        </div>
      </div>

      <div className="flex items-center justify-end w-full gap-3">
        <Link
          to="/loan-changes"
          className="flex items-center justify-center w-32 h-10 py-2 mt-5 font-bold duration-300 border rounded-md outline-none text-custom-red-1 border-custom-red-1 hover:text-custom-red-2 hover:border-custom-red-2 text-md"
        >
          Back
        </Link>

        <button className="flex items-center justify-center w-32 h-10 py-2 mt-5 font-bold text-white duration-300 border-0 rounded-md outline-none hover:bg-custom-red-2 bg-custom-red-1 text-md">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Review;
