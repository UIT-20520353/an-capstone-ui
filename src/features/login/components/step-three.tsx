import { useAppSelector } from "@/app/hooks";
import tick from "@/assets/icons/tick.svg";
import demo from "@/assets/images/demo.png";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import { selectUserDetail } from "@/redux/auth-slice";
import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";

interface StepThreeProps {
  onChangeStep: (step: 1 | 2 | 3) => void;
}

const StepThree: React.FunctionComponent<StepThreeProps> = ({
  onChangeStep,
}) => {
  const navigate = useNavigate();
  const handleResponseError = useHandleResponseError();
  const userDetail = useAppSelector(selectUserDetail);

  const onStart = () => {
    if (userDetail.customerId) {
      navigate("/");
    } else {
      handleResponseError("Vui lòng thực hiện các bước đăng nhập trước.");
    }
  };

  return (
    <div className="w-[500px] p-6 bg-white rounded-md flex flex-col items-start gap-4">
      <div className="flex items-center w-full gap-4">
        <span className="text-2xl font-bold text-custom-green-1">Congrat</span>
        <img src={tick} alt="tick" className="w-8 h-8" />
      </div>
      <span className="text-base">
        Hi {userDetail.name}, welcome to Home Loan Portal
      </span>
      <div className="grid w-full grid-cols-3 gap-5">
        <img
          src={demo}
          className="w-full col-span-2 h-[300px] bg-gray-300 rounded-md object-center object-cover border border-gray-300"
          alt="demo"
        />
        <div className="flex flex-col items-center justify-end w-full">
          {/* <img className="w-20 h-20" src={face} alt="face" /> */}
          <div className="flex flex-col items-center w-full gap-2">
            <button
              className={clsx(
                "w-20 h-10 text-sm font-bold text-white rounded-md ",
                {
                  " bg-gray-400 cursor-not-allowed": !userDetail.customerId,
                  "bg-custom-red-2": Boolean(userDetail.customerId),
                }
              )}
              disabled={!userDetail.customerId}
              onClick={onStart}
            >
              Start
            </button>
            <button
              className="w-20 h-10 text-sm font-bold bg-white border rounded-md text-custom-red-2 border-custom-red-2"
              onClick={() => onChangeStep(2)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
