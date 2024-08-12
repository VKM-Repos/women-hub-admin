import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import NotificationIcon from "@/assets/icons/notification-icon.svg";
import Avatar from "@/assets/icons/avatar.svg";
import ChevronDown from "@/assets/icons/chevron-down-icon.svg";

import Icon from "../icons/Icon";
import useAppStore from "@/lib/store/app.store";
const Header = () => {
  const { pathname } = useLocation();
  const { logout, user } = useAppStore();

  let modifiedPath = pathname.replace("/", "");
  modifiedPath = modifiedPath.replace("-", " ");
  modifiedPath = modifiedPath.replace("-", " ");

  let modifiedUserRole = user?.role?.replace("_", " ");
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="flex justify-end font-inter">
      <div className=" w-[80%] min-w-[80%] max-w-[80%] h-16 bg-white rounded-bl-3xl flex items-center justify-between px-10 fixed z-50">
        <span className="font-semibold text-[20px] capitalize static">
          {modifiedPath}
        </span>
        <div className="flex items-center">
          <img src={NotificationIcon} alt="" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default">
                <div className="flex gap-10 items-center">
                  <div className="flex gap-2 items-center">
                    <img src={Avatar} alt="" />
                    <div className="flex flex-col justify-start items-start">
                      <span className="text-txtColor text-[12px] font-medium">
                        {user?.name}
                      </span>
                      <span className="text-[9px] font-light capitalize">
                        {modifiedUserRole}
                      </span>
                    </div>
                    <div>
                      <img src={ChevronDown} alt="" />
                    </div>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px] shadow-md drop-shadow-md">
              <div className="flex flex-col py-2">
                <Link
                  to={`/settings`}
                  className="flex items-center gap-2 hover:bg-[#EFEFEF] text-sm px-2 py-[6px] rounded-md"
                >
                  <Icon name="settings" /> Settings
                </Link>
                <span
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:bg-[#EFEFEF] text-sm px-2 py-[6px] rounded-md cursor-pointer"
                >
                  <Icon name="logout" /> Log Out
                </span>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
