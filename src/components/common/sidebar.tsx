import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

interface SidebarProps {}

interface MenuProps {
  label: string;
  to: string;
}

const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  const location = useLocation();

  const menus = useMemo(
    (): MenuProps[] => [
      { label: "Getting started", to: "/" },
      { label: "Banker details", to: "/banker-details" },
      { label: "Home loan details", to: "/home-loan-details" },
      { label: "Loan changes", to: "/loan-changes" },
      { label: "Review", to: "/review" },
    ],
    []
  );

  return (
    <div className="w-56 max-h-[calc(100vh-80px)] min-h-[calc(100vh-80px)] overflow-auto border-r border-black flex items-start pl-5 gap-3 pt-5 flex-col">
      {menus.map((menu, index) => (
        <span
          className={`${
            location.pathname === menu.to
              ? "text-red-500 font-medium"
              : "text-black"
          }`}
          key={`sidebar-menu-${index}`}
        >
          {menu.label}
        </span>
      ))}
    </div>
  );
};

export default Sidebar;
