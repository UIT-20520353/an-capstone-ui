import { useAppDispatch } from "@/app/hooks";
import useAccessToken from "@/hooks/useAccessToken";
import { setAccessToken } from "@/redux/auth-slice";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface MainLayoutProps {}

const MainLayout: React.FunctionComponent<MainLayoutProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken } = useAccessToken();

  useEffect(() => {
    if (accessToken) {
      dispatch(setAccessToken(accessToken));
    } else {
      navigate("/login");
    }
  }, [accessToken, navigate, dispatch]);

  return (
    <div className="w-full min-h-screen bg-red-300">
      <Outlet />
    </div>
  );
};

export default MainLayout;
