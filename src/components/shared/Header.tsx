import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import NotificationIcon from '@/assets/icons/notification-icon.svg';
import Avatar from '@/assets/icons/avatar.svg';
import ChevronDown from '@/assets/icons/chevron-down-icon.svg';

import Icon from '../icons/Icon';
import useAppStore from '@/lib/store/app.store';

import { routess } from '@/routes';
import useRouteName from '@/hooks/useRoutename';
import useResetAllStores from '@/store/useResetAll.store';
const Header = () => {
  const { logout, user } = useAppStore();
  const resetAllStores = useResetAllStores();
  const { state } = useLocation();
  const routeName = useRouteName(routess);
  let modifiedUserRole = user?.role?.replace('_', ' ');
  const handleLogout = () => {
    resetAllStores();
    logout();
  };

  return (
    <div className="font-inter flex justify-end">
      <div className=" fixed z-50 flex h-16 w-[80%] min-w-[80%] max-w-[80%] items-center justify-between rounded-bl-3xl bg-white px-10">
        <span className="static text-[20px] font-semibold capitalize">
          {state?.operation ? state?.operation : ''} {routeName || ''}
        </span>
        <div className="flex items-center">
          <img src={NotificationIcon} alt="" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default">
                <div className="flex items-center gap-10">
                  <div className="flex items-center gap-2">
                    <img src={Avatar} alt="" />
                    <div className="flex flex-col items-start justify-start">
                      <span className="text-txtColor text-[12px] font-medium">
                        {user?.name}
                      </span>
                      <span className="font-light text-[9px] capitalize">
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
                  className="flex items-center gap-2 rounded-md px-2 py-[6px] text-sm hover:bg-[#EFEFEF]"
                >
                  <Icon name="settings" /> Settings
                </Link>
                <span
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-[6px] text-sm hover:bg-[#EFEFEF]"
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
