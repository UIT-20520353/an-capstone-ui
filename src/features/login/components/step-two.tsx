import React from "react";
import face from "@/assets/icons/face.svg";

interface StepTwoProps {
  onChangeStep: (step: 1 | 2 | 3) => void;
}

const StepTwo: React.FunctionComponent<StepTwoProps> = ({ onChangeStep }) => {
  return (
    <div className="w-[450px] p-6 bg-white rounded-md flex flex-col items-start gap-4">
      <span className="text-base">
        Please complete second step to process your request
      </span>
      <div className="grid w-full grid-cols-3 gap-5">
        <div className="w-full col-span-2 h-[300px] bg-gray-300"></div>
        <div className="flex flex-col items-center justify-between w-full">
          <img className="w-20 h-20" src={face} alt="face" />
          <div className="flex flex-col items-center w-full gap-2">
            <button
              className="w-20 h-10 text-sm font-bold text-white rounded-md bg-custom-red-2"
              onClick={() => onChangeStep(3)}
            >
              Start
            </button>
            <button
              className="w-20 h-10 text-sm font-bold bg-white border rounded-md text-custom-red-2 border-custom-red-2"
              onClick={() => onChangeStep(1)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
