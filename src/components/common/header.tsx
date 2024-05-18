import { images } from "@/assets";
import React from "react";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = () => (
  <div className="flex items-center justify-between w-full h-20 px-5 border-b border-black">
    <img src={images.logo} alt="logo" className="w-[100px] h-[64px]" />
    <p className="text-3xl font-medium">Request to change my home loan</p>
    <img src={images.house} alt="house" className="w-[85px] h-[64px]" />
  </div>
);

export default Header;
