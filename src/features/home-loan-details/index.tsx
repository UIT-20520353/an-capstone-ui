import React, { useMemo } from "react";
import { Link } from "react-router-dom";

interface HomeLoanDetailsProps {}

interface InforProps {
  label: string;
  dataIndex: string;
}

const HomeLoanDetails: React.FunctionComponent<HomeLoanDetailsProps> = () => {
  const anotherInfors = useMemo(
    (): InforProps[] => [
      {
        label: "Product name",
        dataIndex: "NAB Tailor home loan",
      },
      {
        label: "Assurance attachment",
        dataIndex: "No",
      },
      {
        label: "Rate type",
        dataIndex: "Variable",
      },
      {
        label: "Interest rate per annum",
        dataIndex: "2.09%",
      },
      {
        label: "Offset account number",
        dataIndex: "9372018263",
      },
      {
        label: "Loan purpose",
        dataIndex: "Owner Occupied Principal Place of Residence ",
      },
    ],
    []
  );

  return (
    <div className="flex flex-col items-start w-full gap-4 px-10 py-4">
      <h3 className="text-3xl font-semibold">Home loan details</h3>

      <div className="flex flex-col items-start w-full gap-2">
        <p className="text-base font-semibold">Loan account number</p>
        <div className="w-full max-w-[60%] flex items-center h-16 border border-gray-500 rounded-xl px-4 justify-between">
          <p className="text-base font-medium">9372018263-2024-BPB</p>
          <div className="flex flex-col items-end justify-between">
            <p className="text-base font-bold">$300,000.01</p>
            <p className="text-base">Current balance</p>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-y-3">
        {anotherInfors.map((infor, index) => (
          <div
            key={`another-infor-${index}`}
            className="flex flex-col items-start col-span-1"
          >
            <p className="text-base font-semibold">{infor.label}</p>
            <p className="text-base">{infor.dataIndex}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end w-full gap-3">
        <Link
          to="/banker-details"
          className="flex items-center justify-center w-32 h-10 py-2 mt-5 font-bold duration-300 border rounded-md outline-none text-custom-red-1 border-custom-red-1 hover:text-custom-red-2 hover:border-custom-red-2 text-md"
        >
          Back
        </Link>

        <Link
          to="/loan-changes"
          className="flex items-center justify-center w-32 h-10 py-2 mt-5 font-bold text-white duration-300 border-0 rounded-md outline-none hover:bg-custom-red-2 bg-custom-red-1 text-md"
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default HomeLoanDetails;
