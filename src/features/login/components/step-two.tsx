import axiosClient from "@/api/axiosClient";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import face from "@/assets/icons/face.svg";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import { selectAccessToken, setUserDetail } from "@/redux/auth-slice";
import clsx from "clsx";
import React, { useRef, useState } from "react";

interface StepTwoProps {
  onChangeStep: (step: 1 | 2 | 3) => void;
}

const StepTwo: React.FunctionComponent<StepTwoProps> = ({ onChangeStep }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleResponseError = useHandleResponseError();
  const accessToken = useAppSelector(selectAccessToken);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [base64, setBase64] = useState<string>("");

  const onOpenFileDialog = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const getBase64 = async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  };

  const onUploadedImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setLoading(true);
      await getBase64(e.target.files[0])
        .then((res) => {
          setBase64(res as string);
        })
        .catch((e) => {
          console.error(e);
          handleResponseError("Xảy ra lỗi khi convert image thành base64.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onStart = () => {
    setLoading(true);
    axiosClient
      .post(
        "/api/authentication/faceid.php",
        {
          img: base64.split(",")[1],
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

  return (
    <div className="w-[450px] p-6 bg-white rounded-md flex flex-col items-start gap-4">
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={inputRef}
        className="hidden"
        multiple={false}
        onChange={onUploadedImage}
      />

      <span className="text-base">
        Please complete second step to process your request
      </span>
      <div className="grid w-full grid-cols-3 gap-5">
        <div className="w-full col-span-2 h-[300px] bg-gray-300"></div>
        <div className="flex flex-col items-center justify-between w-full">
          <img
            className="w-20 h-20 cursor-pointer"
            src={face}
            alt="face"
            onClick={onOpenFileDialog}
          />
          <div className="flex flex-col items-center w-full gap-2">
            <button
              className={clsx(
                "w-20 h-10 text-sm font-bold text-white rounded-md ",
                {
                  "bg-custom-red-2": !(isLoading || !base64),
                  "bg-gray-400 cursor-not-allowed": isLoading || !base64,
                }
              )}
              onClick={onStart}
              disabled={isLoading || !base64}
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
