import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SIDENAV_ITEMS } from "@/components/shared/NavItems";
import { PAGE_ITEMS } from "@/components/shared/PageItems";
import { TOOLS_ITEMS } from "./ToolsItems";

import { SideNavItem } from "@/types";

import chevron from "@/assets/icons/chevron-down-icon.svg";
import footerImg from "@/assets/sidbar-footer-img.svg";

import logo from "@/assets/logo.svg";
const SideNav = () => {
  return (
    <div className="w-60 bg-primary flex font-inter pb-5">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          to="/home"
          className="flex flex-row space-x-3 my-10 items-center justify-center px-6 h-12 w-full"
        >
          <img src={logo} alt="" className="aspect-square w-[80px]" />
        </Link>

        <div className="flex flex-col space-y-2 pr-5">
          <span className="text-[10px] font-semibold text-white pl-3">
            HOME
          </span>
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>

        <div className="flex flex-col space-y-2 pr-5">
          <span className="text-[10px] font-semibold text-white pl-3">
            PAGES
          </span>
          {PAGE_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>

        <div className="flex flex-col space-y-2 pr-5">
          <span className="text-[10px] font-semibold text-white pl-3">
            TOOLS
          </span>
          {TOOLS_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>

        <div className="flex flex-col justify-center space-y-2 mb-5  md:px-6">
          <img src={footerImg} alt="" className="-mb-4" />
          <span className="text-white text-[12px] text-center font-inter">
            Copyright © 2024 VHDO.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="font-inter text-[11px] text-white">
      {item.submenu ? (
        <>
          <div className="flex items-center gap-2 justify-between group">
            <span
              className={`h-10 w-[8px] rounded-tr-xl rounded-br-xl ${
                subMenuOpen ? "bg-secondary" : ""
              } group-hover:bg-white group-hover:bg-opacity-[10%]`}
            />
            <button
              onClick={toggleSubMenu}
              className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between group-hover:bg-white group-hover:bg-opacity-[10%] hover:text-white font-inter ${
                subMenuOpen ? "bg-[#E3FFF4] text-primary" : ""
              }`}
            >
              <div className="flex flex-row space-x-4 items-center">
                {item.icon}
                <span className="flex font-medium">{item.title}</span>
              </div>

              <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
                <img src={chevron} alt="" />
              </div>
            </button>
          </div>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-3">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    to={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-medium" : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center gap-2 justify-between group">
          <span
            className={`h-10 w-[8px] rounded-tr-xl rounded-br-xl ${
              item.path == pathname ? "bg-secondary" : ""
            } group-hover:bg-white group-hover:bg-opacity-[10%]`}
          />{" "}
          <Link
            to={item.path}
            className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-white hover:bg-opacity-[10%] hover:text-white w-full ${
              item.path == pathname ? "bg-[#E3FFF4] text-primary" : ""
            }`}
          >
            {item.icon}
            <span className="font-medium flex">{item.title}</span>
          </Link>
        </div>
      )}
    </div>
  );
};
