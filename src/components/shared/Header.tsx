import { Link } from "react-router-dom";
import NotificationIcon from "@/assets/icons/notification-icon.svg";
import Avatar from "@/assets/icons/avatar.svg";
import ChevronDown from "@/assets/icons/chevron-down-icon.svg";

const Header = () => {
  return (
    <div className="flex justify-end font-inter">
      <div className=" w-[80%] h-16 bg-white rounded-bl-3xl flex items-center justify-between px-10 fixed z-50">
        <span className="font-semibold text-[20px]">Overview</span>
        <div className="flex gap-10 items-center">
          <img src={NotificationIcon} alt="" />
          <div className="flex gap-2 items-center">
            <img src={Avatar} alt="" />
            <div className="flex flex-col">
              <span className="text-txtColor text-[12px] font-medium">
                Salis Sadiq
              </span>
              <span className="text-[9px] font-light">Super Admin</span>
            </div>
            <div>
              <img src={ChevronDown} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
