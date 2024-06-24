import axiosClient from "@/api/axiosClient";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import SkeletonLoader from "@/components/common/skeleton-loader";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import { IHomeLoadDetails } from "@/models/home-loan-details";
import { selectAccessToken, selectUserDetail } from "@/redux/auth-slice";
import { setHomeLoanDetails } from "@/redux/global-slice";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

interface HomeLoanDetailsProps {}

interface InforProps {
  label: string;
  dataIndex: keyof IHomeLoadDetails;
}

const HomeLoanDetails: React.FunctionComponent<HomeLoanDetailsProps> = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(selectAccessToken);
  const userDetail = useAppSelector(selectUserDetail);
  const handleResponseError = useHandleResponseError();

  const [details, setDetails] = useState<IHomeLoadDetails | undefined>(
    undefined
  );

  const anotherInfors = useMemo(
    (): InforProps[] => [
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

  const fetchData = useCallback(() => {
    axiosClient
      .post(
        "/api/homeloan/loandetails.php",
        {
          id: userDetail.customerId || "C01",
        },
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
          setDetails(res.data);
          dispatch(setHomeLoanDetails(res.data));
        }
      })
      .catch((e) => {
        console.error(e);
        handleResponseError("Xảy ra lỗi khi lấy thông tin");
      });
  }, [accessToken, handleResponseError, userDetail.customerId, dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col items-start w-full gap-4 px-10 py-4">
      <h3 className="text-3xl font-semibold">Home loan details</h3>

      <div className="flex flex-col items-start w-full gap-2">
        <p className="text-base font-semibold">Loan account number</p>
        <div className="w-full max-w-[60%] flex items-center h-16 border border-gray-500 rounded-xl px-4 justify-between">
          {details ? (
            <p className="text-base font-medium">{details.loanAcc}</p>
          ) : (
            <SkeletonLoader />
          )}
          <div className="flex flex-col items-end justify-between">
            {details ? (
              <p className="text-base font-bold">
                <NumericFormat
                  value={details.currentBalance}
                  prefix="$"
                  thousandSeparator=","
                  displayType="text"
                  className="text-base font-bold"
                />
              </p>
            ) : (
              <SkeletonLoader width={150} height={10} />
            )}
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
            {details ? (
              <p className="text-base">{details[infor.dataIndex]}</p>
            ) : (
              <SkeletonLoader width={250} />
            )}
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
