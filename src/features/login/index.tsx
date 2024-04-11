import { images } from "@/assets";
import React, { useState } from "react";
import StepOne from "./components/step-one";
import StepTwo from "./components/step-two";
import StepThree from "./components/step-three";

interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const onChangeStep = (value: 1 | 2 | 3) => {
    setStep(value);
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <img src={images.logo} alt="logo" className="w-[140px] h-[104px]" />
      </div>
      <div
        className={`w-full h-[calc(100vh-104px)] bg-image bg-cover pt-12 pl-10 bg-center bg-no-repeat`}
      >
        {step === 1 && <StepOne onChangeStep={onChangeStep} />}
        {step === 2 && <StepTwo onChangeStep={onChangeStep} />}
        {step === 3 && <StepThree onChangeStep={onChangeStep} />}
      </div>
    </div>
  );
};

export default LoginPage;
