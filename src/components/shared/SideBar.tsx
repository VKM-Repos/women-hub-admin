import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SIDENAV_ITEMS } from '@/components/shared/NavItems';
import { PAGE_ITEMS } from '@/components/shared/PageItems';
import { TOOLS_ITEMS } from './ToolsItems';

import { SideNavItem } from '@/types';

import chevron from '@/assets/icons/chevron-down-icon.svg';
import footerImg from '@/assets/sidbar-footer-img.svg';
import logo from '@/assets/logo.svg';
import useAppStore from '@/lib/store/app.store';
const SideNav = () => {
  const { user } = useAppStore();
  return (
    <div className="no-scrollbar bg-primary font-inter sticky flex h-screen max-h-screen w-60 overflow-y-scroll pb-5">
      <div className="flex w-full flex-col space-y-6">
        <Link
          to="/"
          className="my-10 flex h-12 w-full flex-row items-center justify-center space-x-3 px-6"
        >
          <img src={logo} alt="" className="aspect-square w-[80px]" />
        </Link>

        <div className="flex flex-col space-y-2 pr-5">
          <span className="pl-3 text-[10px] font-semibold text-white">
            HOME
          </span>
          {SIDENAV_ITEMS.map((item, idx) => {
            if (user?.role === 'EDITOR' && item.access?.includes('EDITOR')) {
              return <MenuItem key={idx} item={item} />;
            } else if (user?.role === 'SUPER_ADMIN') {
              return <MenuItem key={idx} item={item} />;
            }
          })}
        </div>

        {user?.role === 'SUPER_ADMIN' && (
          <div className="flex flex-col space-y-2 pr-5">
            <span className="pl-3 text-[10px] font-semibold text-white">
              PAGES
            </span>
            {PAGE_ITEMS.map((item, idx) => {
              return <MenuItem key={idx} item={item} />;
            })}
          </div>
        )}

        <div className="flex flex-col space-y-2 pr-5">
          <span className="pl-3 text-[10px] font-semibold text-white">
            TOOLS
          </span>
          {TOOLS_ITEMS.map((item, idx) => {
            if (user?.role === 'EDITOR' && item.access?.includes('EDITOR')) {
              return <MenuItem key={idx} item={item} />;
            } else if (user?.role === 'SUPER_ADMIN') {
              return <MenuItem key={idx} item={item} />;
            }
          })}
        </div>

        <div className="mb-5 flex flex-col justify-center space-y-2  md:px-6">
          <img src={footerImg} alt="" className="-mb-4" />
          <span className="font-inter text-center text-[12px] text-white">
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
          <div className="group flex items-center justify-between gap-2">
            <span
              className={`h-10 w-[8px] rounded-br-xl rounded-tr-xl ${
                subMenuOpen ? 'bg-secondary' : ''
              } group-hover:bg-white group-hover:bg-opacity-[10%]`}
            />
            <button
              onClick={toggleSubMenu}
              className={`hover-bg-zinc-100 font-inter flex w-full flex-row items-center justify-between rounded-lg p-2 hover:text-white group-hover:bg-white group-hover:bg-opacity-[10%] ${
                subMenuOpen ? 'text-primary bg-[#E3FFF4]' : ''
              }`}
            >
              <div className="flex flex-row items-center space-x-4">
                {item.icon}
                <span className="flex font-medium">{item.title}</span>
              </div>

              <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
                <img src={chevron} alt="" />
              </div>
            </button>
          </div>

          {subMenuOpen && (
            <div className="my-2 flex w-full flex-col space-y-3 pl-5 ">
              {item.subMenuItems?.map((subItem: any, idx: number) => {
                return (
                  <Link
                    key={idx}
                    to={subItem.path}
                    className={`flex w-full gap-3 rounded-md px-5 py-2 hover:bg-white hover:bg-opacity-[10%] ${
                      subItem.path === pathname
                        ? 'text-primary bg-[#E3FFF4] font-medium'
                        : ''
                    }`}
                  >
                    {/* {subItem.icon} */}
                    <span>
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 8.90234C16 13.3206 12.4183 16.9023 8 16.9023C3.58172 16.9023 0 13.3206 0 8.90234C0 4.48407 3.58172 0.902344 8 0.902344C12.4183 0.902344 16 4.48407 16 8.90234ZM2.55998 8.90234C2.55998 11.9068 4.99556 14.3424 8 14.3424C11.0044 14.3424 13.44 11.9068 13.44 8.90234C13.44 5.89791 11.0044 3.46233 8 3.46233C4.99556 3.46233 2.55998 5.89791 2.55998 8.90234Z"
                          fill="currentColor"
                        />
                        <path
                          d="M16 8.90234C16 13.3206 12.4183 16.9023 8 16.9023C3.58172 16.9023 0 13.3206 0 8.90234C0 4.48407 3.58172 0.902344 8 0.902344C12.4183 0.902344 16 4.48407 16 8.90234ZM2.55998 8.90234C2.55998 11.9068 4.99556 14.3424 8 14.3424C11.0044 14.3424 13.44 11.9068 13.44 8.90234C13.44 5.89791 11.0044 3.46233 8 3.46233C4.99556 3.46233 2.55998 5.89791 2.55998 8.90234Z"
                          fill="black"
                          fillOpacity="0.2"
                        />
                        <path
                          d="M16 8.90234C16 13.3206 12.4183 16.9023 8 16.9023C3.58172 16.9023 0 13.3206 0 8.90234C0 4.48407 3.58172 0.902344 8 0.902344C12.4183 0.902344 16 4.48407 16 8.90234ZM2.55998 8.90234C2.55998 11.9068 4.99556 14.3424 8 14.3424C11.0044 14.3424 13.44 11.9068 13.44 8.90234C13.44 5.89791 11.0044 3.46233 8 3.46233C4.99556 3.46233 2.55998 5.89791 2.55998 8.90234Z"
                          fill="black"
                          fillOpacity="0.2"
                        />
                        <path
                          d="M16 8.90234C16 13.3206 12.4183 16.9023 8 16.9023C3.58172 16.9023 0 13.3206 0 8.90234C0 4.48407 3.58172 0.902344 8 0.902344C12.4183 0.902344 16 4.48407 16 8.90234ZM2.55998 8.90234C2.55998 11.9068 4.99556 14.3424 8 14.3424C11.0044 14.3424 13.44 11.9068 13.44 8.90234C13.44 5.89791 11.0044 3.46233 8 3.46233C4.99556 3.46233 2.55998 5.89791 2.55998 8.90234Z"
                          fill="black"
                          fillOpacity="0.2"
                        />
                        <path
                          d="M16 8.90234C16 13.3206 12.4183 16.9023 8 16.9023C3.58172 16.9023 0 13.3206 0 8.90234C0 4.48407 3.58172 0.902344 8 0.902344C12.4183 0.902344 16 4.48407 16 8.90234ZM2.55998 8.90234C2.55998 11.9068 4.99556 14.3424 8 14.3424C11.0044 14.3424 13.44 11.9068 13.44 8.90234C13.44 5.89791 11.0044 3.46233 8 3.46233C4.99556 3.46233 2.55998 5.89791 2.55998 8.90234Z"
                          fill="black"
                          fillOpacity="0.2"
                        />
                      </svg>
                    </span>
                    <span className=" w-full">{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div className="group flex items-center justify-between gap-2">
          <span
            className={`h-10 w-[8px] rounded-br-xl rounded-tr-xl ${
              item.path == pathname ? 'bg-secondary' : ''
            } group-hover:bg-white group-hover:bg-opacity-[10%]`}
          />{' '}
          <Link
            to={item.path}
            className={`flex w-full flex-row items-center space-x-4 rounded-lg p-2 hover:bg-white hover:bg-opacity-[10%] hover:text-white ${
              item.path == pathname ? 'text-primary bg-[#E3FFF4]' : ''
            }`}
            state={{ pageName: item.title }}
          >
            {item.icon}
            <span className="flex font-medium">{item.title}</span>
          </Link>
        </div>
      )}
    </div>
  );
};
