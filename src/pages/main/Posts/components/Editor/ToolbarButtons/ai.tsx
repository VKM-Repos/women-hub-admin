/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlignJustify, Check, PenLine, Wand2 } from 'lucide-react';

export type MenuItem = {
  title: string;
  icon?: React.ReactNode;
  link?: string;
  isButton?: boolean;
  condition?: boolean;
  onClick?: (e: any) => void;
};

const menu: MenuItem[] = [
  {
    title: 'Improve writing',
    isButton: true,
    icon: <AlignJustify size={14} />,
    onClick: () => {},
  },
  {
    title: 'Fix spelling',
    isButton: true,
    icon: <Check size={14} />,
    onClick: () => {},
  },
  {
    title: 'Continue story',
    isButton: true,
    icon: <PenLine size={14} />,
    onClick: () => {},
  },
  {
    title: 'Translate',
    isButton: true,
    icon: (
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3.33398 3.88766C3.05784 3.88766 2.83398 4.11152 2.83398 4.38766C2.83398 4.66381 3.05784 4.88766 3.33398 4.88766V3.88766ZM7.33398 4.88766C7.61013 4.88766 7.83398 4.66381 7.83398 4.38766C7.83398 4.11152 7.61013 3.88766 7.33398 3.88766V4.88766ZM5.63398 3.83594C5.63398 3.5598 5.41013 3.33594 5.13398 3.33594C4.85784 3.33594 4.63398 3.5598 4.63398 3.83594H5.63398ZM3.55269 7.46788C3.34942 7.65479 3.33616 7.9711 3.52307 8.17437C3.70998 8.37764 4.02628 8.3909 4.22956 8.20399L3.55269 7.46788ZM4.91004 5.26109C4.79339 5.01079 4.49592 4.90246 4.24563 5.01911C3.99533 5.13576 3.887 5.43323 4.00365 5.68352L4.91004 5.26109ZM5.58792 7.63083C5.77936 7.82985 6.09588 7.83599 6.2949 7.64455C6.49391 7.45311 6.50005 7.13659 6.30862 6.93758L5.58792 7.63083ZM8.53911 12.977C8.43291 13.2319 8.55345 13.5246 8.80835 13.6308C9.06325 13.737 9.35599 13.6165 9.46219 13.3616L8.53911 12.977ZM9.55618 11.8359L9.09465 11.6436L9.09464 11.6436L9.55618 11.8359ZM11.8724 13.3616C11.9786 13.6165 12.2714 13.737 12.5263 13.6308C12.7812 13.5246 12.9017 13.2319 12.7955 12.977L11.8724 13.3616ZM11.7785 11.8359L12.24 11.6436L12.24 11.6436L11.7785 11.8359ZM10.6673 9.16927L11.1289 8.97696C11.0512 8.79064 10.8692 8.66927 10.6673 8.66927C10.4655 8.66927 10.2834 8.79064 10.2058 8.97696L10.6673 9.16927ZM8.83398 7.16927C8.83398 7.44541 9.05784 7.66927 9.33398 7.66927C9.61013 7.66927 9.83398 7.44541 9.83398 7.16927H8.83398ZM6.66732 10.3359C6.94346 10.3359 7.16732 10.1121 7.16732 9.83594C7.16732 9.5598 6.94346 9.33594 6.66732 9.33594V10.3359ZM3.16732 11.5026C3.16732 11.2265 2.94346 11.0026 2.66732 11.0026C2.39118 11.0026 2.16732 11.2265 2.16732 11.5026H3.16732ZM2.89202 13.2433L3.30777 12.9656L3.30775 12.9655L2.89202 13.2433ZM3.25989 13.6112L3.5377 13.1955L3.53765 13.1955L3.25989 13.6112ZM5.00065 14.3359C5.27679 14.3359 5.50065 14.1121 5.50065 13.8359C5.50065 13.5598 5.27679 13.3359 5.00065 13.3359V14.3359ZM12.834 5.5026C12.834 5.77875 13.0578 6.0026 13.334 6.0026C13.6101 6.0026 13.834 5.77875 13.834 5.5026H12.834ZM13.1093 3.76184L12.6935 4.03961L12.6935 4.03965L13.1093 3.76184ZM12.7414 3.39398L12.4636 3.8097L12.4636 3.80972L12.7414 3.39398ZM11.0007 2.66927C10.7245 2.66927 10.5007 2.89313 10.5007 3.16927C10.5007 3.44541 10.7245 3.66927 11.0007 3.66927V2.66927Z"></path>
      </svg>
    ),
    onClick: () => {},
  },
];

export function AI() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="text-txtColor border-gray-300 flex items-center justify-center gap-2 border"
          variant="outline"
        >
          <Wand2 size={16} /> <p>Ask AI</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[36rem] p-2">
        <textarea
          className="placeholder:text-gray-500 bg-background mt-2 min-h-[10rem] w-full resize-none rounded-md border p-2"
          placeholder="Ask AI to write a post about"
        >
          {/* <span className="text-txtColor">
            <Wand2 size={16} />
            Ask AI to write a post about
          </span> */}
        </textarea>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menu.map((item, index) => (
            <React.Fragment key={index}>
              <DropdownMenuItem onClick={item.onClick}>
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.title}
              </DropdownMenuItem>
              {index < menu.length - 1 && <DropdownMenuSeparator />}
            </React.Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
