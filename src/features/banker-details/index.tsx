import axiosClient from "@/api/axiosClient";
import { useAppSelector } from "@/app/hooks";
import SkeletonLoader from "@/components/common/skeleton-loader";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import { IBankerDetail } from "@/models/banker-detail";
import { selectAccessToken, selectUserDetail } from "@/redux/auth-slice";
import { Button } from "antd";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface BankderDetailsProps {}

const BankderDetails: React.FunctionComponent<BankderDetailsProps> = () => {
  const navigate = useNavigate();
  const accessToken = useAppSelector(selectAccessToken);
  const userDetail = useAppSelector(selectUserDetail);
  const handleResponseError = useHandleResponseError();

  const [details, setDetails] = useState<IBankerDetail | undefined>(undefined);

  const fetchData = useCallback(() => {
    axiosClient
      .post(
        "/api/banker/details.php",
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
        }
      })
      .catch((e) => {
        console.error(e);
        handleResponseError("Xảy ra lỗi khi lấy thông tin");
      });
  }, [accessToken, handleResponseError, userDetail.customerId]);

  const onNext = () => {
    navigate("/home-loan-details");
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col items-start w-full gap-5 px-10 py-4">
      <h3 className="text-3xl font-semibold">Banker details</h3>

      <div className="flex flex-col items-start w-full gap-3">
        <p className="text-lg">Enter banker details here.</p>
        <div className="grid w-full grid-cols-2 gap-y-3">
          <div className="flex flex-col col-span-1 gap-2">
            <p className="text-base font-bold">Banker name</p>
            {details ? (
              <p className="text-base">{details.bankerName}</p>
            ) : (
              <SkeletonLoader />
            )}
          </div>

          <div className="flex flex-col col-span-1 gap-2">
            <p className="text-base font-bold">Banker email</p>
            {details ? (
              <p className="text-base text-red-500">{details.bankerEmail}</p>
            ) : (
              <SkeletonLoader width={300} />
            )}
          </div>

          <div className="flex flex-col col-span-1 gap-2">
            <p className="text-base font-bold">Banker area</p>
            {details ? (
              <p className="text-base">{details.bankerArea}</p>
            ) : (
              <SkeletonLoader width={180} />
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end w-full gap-3">
        <Link
          to="/"
          className="flex items-center justify-center w-32 h-10 py-2 mt-5 font-bold duration-300 border rounded-md outline-none text-md text-custom-red-1 border-custom-red-1 hover:text-custom-red-2 hover:border-custom-red-2"
        >
          Back
        </Link>

        <Button
          type="primary"
          className={clsx(
            "hover:!bg-custom-red-2 bg-custom-red-1 text-md flex items-center justify-center w-32 h-10 py-2 mt-5 font-bold text-white duration-300 border-0 rounded-md outline-none"
          )}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default BankderDetails;
