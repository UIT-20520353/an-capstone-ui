import React from "react";
import { Link } from "react-router-dom";

interface BankderDetailsProps {}

const BankderDetails: React.FunctionComponent<BankderDetailsProps> = () => {
  return (
    <div className="flex flex-col items-start w-full gap-5 px-10 py-4">
      <h3 className="text-3xl font-semibold">Banker details</h3>

      <div className="flex flex-col items-start w-full gap-3">
        <p className="text-lg">Enter banker details here.</p>
        <div className="grid w-full grid-cols-2 gap-y-3">
          <div className="flex flex-col col-span-1">
            <p className="text-base font-bold">Banker name</p>
            <p className="text-base">Andie Tran</p>
          </div>

          <div className="flex flex-col col-span-1">
            <p className="text-base font-bold">Banker email</p>
            <p className="text-base text-red-500">Andie.Tran@nab.com.au</p>
          </div>

          <div className="flex flex-col col-span-1">
            <p className="text-base font-bold">Banker area</p>
            <p className="text-base">Retail banker</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end w-full gap-3">
        <Link
          to="/"
          className="flex items-center justify-center w-32 h-10 py-2 mt-5 font-bold duration-300 border rounded-md outline-none text-custom-red-1 border-custom-red-1 hover:text-custom-red-2 hover:border-custom-red-2 text-md"
        >
          Back
        </Link>

        <Link
          to="/home-loan-details"
          className="flex items-center justify-center w-32 h-10 py-2 mt-5 font-bold text-white duration-300 border-0 rounded-md outline-none hover:bg-custom-red-2 bg-custom-red-1 text-md"
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default BankderDetails;
