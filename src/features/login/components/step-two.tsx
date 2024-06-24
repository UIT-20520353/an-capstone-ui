import axiosClient from "@/api/axiosClient";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import face from "@/assets/icons/face.svg";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import { selectAccessToken, setUserDetail } from "@/redux/auth-slice";
import clsx from "clsx";
import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

interface StepTwoProps {
  onChangeStep: (step: 1 | 2 | 3) => void;
}

const StepTwo: React.FunctionComponent<StepTwoProps> = ({ onChangeStep }) => {
  const dispatch = useAppDispatch();
  const handleResponseError = useHandleResponseError();
  const accessToken = useAppSelector(selectAccessToken);
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | undefined | null>(null);

  const [isLoading, setLoading] = useState<boolean>(false);

  const capture = useCallback(() => {
    if (imgSrc) return;

    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, imgSrc]);

  const onStart = () => {
    setLoading(true);
    axiosClient
      .post(
        "/api/authentication/faceid.php",
        {
          img: imgSrc?.split(",")[1],
        },
        {
          headers: {
            "access-token": accessToken,
          },
        }
      )
      .then((res) => {
        if (res.data.error === -1) {
          handleResponseError("Xảy ra lỗi khi thực hiện Faceid");
        } else {
          dispatch(setUserDetail(res.data));
          onChangeStep(3);
        }
      })
      .catch((e) => {
        console.error(e);
        handleResponseError("Xảy ra lỗi khi thực hiện Faceid");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const retake = useCallback(() => {
    setImgSrc(null);
  }, []);

  return (
    <div className="w-[450px] p-6 bg-white rounded-md flex flex-col items-start gap-4">
      <span className="text-base">
        Please complete second step to process your request
      </span>
      <div className="grid w-full grid-cols-3 gap-5">
        <div className="w-full max-w-full col-span-2 h-[300px] flex items-center justify-center">
          {imgSrc ? (
            <img src={imgSrc} alt="webcam" />
          ) : (
            <Webcam width="100%" ref={webcamRef} />
          )}
        </div>

        <div className="flex flex-col items-center justify-between w-full">
          <img
            className={clsx("w-20 h-20", {
              "cursor-pointer": !imgSrc,
              "cursor-context-menu": !!imgSrc,
            })}
            src={face}
            alt="face"
            onClick={capture}
          />
          <div className="flex flex-col items-center w-full gap-2">
            {!!imgSrc && (
              <button
                className={clsx(
                  "w-20 h-10 text-sm font-bold bg-white border rounded-md",
                  {
                    "text-custom-red-2 border-custom-red-2": !isLoading,
                    "text-gray-400 border-gray-400 cursor-not-allowed":
                      isLoading,
                  }
                )}
                onClick={retake}
                disabled={isLoading}
              >
                Retake
              </button>
            )}
            <button
              className={clsx(
                "w-20 h-10 text-sm font-bold text-white rounded-md ",
                {
                  "bg-custom-red-2": !(isLoading || !imgSrc),
                  "bg-gray-400 cursor-not-allowed": isLoading || !imgSrc,
                }
              )}
              onClick={onStart}
              disabled={isLoading || !imgSrc}
            >
              Start
            </button>
            <button
              className={clsx(
                "w-20 h-10 text-sm font-bold bg-white border rounded-md",
                {
                  "text-custom-red-2 border-custom-red-2": !isLoading,
                  "text-gray-400 border-gray-400 cursor-not-allowed": isLoading,
                }
              )}
              onClick={() => onChangeStep(1)}
              disabled={isLoading}
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
