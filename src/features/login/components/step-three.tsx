import React from "react";
import tick from "@/assets/icons/tick.svg";
import face from "@/assets/icons/face.svg";
import demo from "@/assets/images/demo.png";

interface StepThreeProps {
  onChangeStep: (step: 1 | 2 | 3) => void;
}

const StepThree: React.FunctionComponent<StepThreeProps> = ({
  onChangeStep,
}) => {
  return (
    <div className="w-[500px] p-6 bg-white rounded-md flex flex-col items-start gap-4">
      <div className="flex items-center w-full gap-4">
        <span className="text-2xl font-bold text-custom-green-1">Congrat</span>
        <img src={tick} alt="tick" className="w-8 h-8" />
      </div>
      <span className="text-base">Hi Andie, welcome to Home Loan Portal</span>
      <div className="grid w-full grid-cols-3 gap-5">
        <img
          src={demo}
          className="w-full col-span-2 h-[300px] bg-gray-300 rounded-md object-center object-cover border border-gray-300"
          alt="demo"
        />
        <div className="flex flex-col items-center justify-between w-full">
          <img className="w-20 h-20" src={face} alt="face" />
          <div className="flex flex-col items-center w-full gap-2">
            <button className="w-20 h-10 text-sm font-bold text-white rounded-md bg-custom-red-2">
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
