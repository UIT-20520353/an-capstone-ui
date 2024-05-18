import { useAppDispatch } from "@/app/hooks";
import { images } from "@/assets";
import useAccessToken from "@/hooks/useAccessToken";
import { setAccessToken } from "@/redux/auth-slice";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "@/components/common/header";
import Sidebar from "@/components/common/sidebar";

interface MainLayoutProps {}

const MainLayout: React.FunctionComponent<MainLayoutProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { accessToken } = useAccessToken();

  // useEffect(() => {
  //   if (accessToken) {
  //     dispatch(setAccessToken(accessToken));
  //   } else {
  //     navigate("/login");
  //   }
  // }, [accessToken, navigate, dispatch]);

  return (
    <div className="w-full min-h-screen ">
      <Header />
      <div className="flex items-start w-full">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
