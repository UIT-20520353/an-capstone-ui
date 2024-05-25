import { EAppContrants } from "@/app/constrants";
import { useAppDispatch } from "@/app/hooks";
import { clearAuthState, setAccessToken } from "@/redux/auth-slice";
import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

const useAccessToken = () => {
  const dispatch = useAppDispatch();
  const [accessToken, setLocalStorage, removeLocalStorage] = useLocalStorage(
    EAppContrants.LOCAL_STORAGE_ACCESS_TOKEN,
    ""
  );

  const setDataLogin = useCallback(
    (accessToken: string) => {
      setLocalStorage(accessToken);
      dispatch(setAccessToken(accessToken));
    },
    [setLocalStorage, dispatch]
  );

  const logout = useCallback(() => {
    dispatch(clearAuthState());
    removeLocalStorage();
  }, [removeLocalStorage, dispatch]);

  return {
    accessToken,
    setDataLogin,
    logout,
  };
};

export default useAccessToken;
