import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useCallback, useMemo } from "react";

const useHandleResponseError = () => {
  const title = useMemo(
    () => (
      <div className="flex flex-col items-center w-full gap-1">
        <ExclamationCircleOutlined className="text-3xl text-custom-red-1" />
        <span className="text-lg font-medium text-custom-red-1">Lỗi</span>
      </div>
    ),
    []
  );

  const handleResponseError = useCallback(
    (message: string) => {
      const instance = Modal.error({
        title,
        content: (
          <div className="flex items-center justify-center w-full">
            <p className="text-base text-center">{message}</p>
          </div>
        ),
        centered: true,
        footer: (
          <div className="flex items-center justify-center w-full mt-2">
            <Button
              className="w-1/2 hover:!bg-custom-red-2 !bg-custom-red-1 font-medium text-base flex items-center justify-center"
              type="primary"
              onClick={() => instance.destroy()}
            >
              OK
            </Button>
          </div>
        ),
        icon: null,
      });
    },
    [title]
  );

  return handleResponseError;
};

export default useHandleResponseError;
