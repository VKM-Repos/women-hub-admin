import Logo from "@/assets/logo.svg";
import Icon from "@/components/icons/Icon";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-screen h-screen bg-[#ECECEC] flex flex-col justify-center ">
      <div className="flex gap-[480px] absolute -top-10">
        <span className="relative">
          <svg
            width="265"
            height="131"
            viewBox="0 0 265 131"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8" filter="url(#filter0_dii_8665_35202)">
              <path
                d="M53.1597 101.391C-10.935 114.856 -63.7709 50.7862 -38.346 -9.57135L-35.5195 -16.2816C-29.2143 -31.2498 -27.5439 -47.7652 -30.7243 -63.6927L-32.6264 -73.2189C-45.3066 -136.723 17.8226 -188.783 77.7496 -164.241L86.7392 -160.56C101.77 -154.404 118.301 -152.899 134.196 -156.238L141.322 -157.735C205.416 -171.201 258.252 -107.131 232.827 -46.7732L230.001 -40.063C223.696 -25.0948 222.025 -8.57937 225.206 7.34819L227.108 16.8743C239.788 80.3782 176.659 132.438 116.732 107.897L107.742 104.215C92.7116 98.0599 76.1804 96.5546 60.2854 99.8939L53.1597 101.391Z"
                fill="#FF7400"
              />
            </g>
            <defs>
              <filter
                id="filter0_dii_8665_35202"
                x="-52.6542"
                y="-187.132"
                width="317.597"
                height="317.921"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="8.90386" />
                <feGaussianBlur stdDeviation="8.34737" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_8665_35202"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_8665_35202"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="5.56491" dy="8.90386" />
                <feGaussianBlur stdDeviation="10.0168" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.870833 0 0 0 0 1 0 0 0 0 0.941288 0 0 0 0.42 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect2_innerShadow_8665_35202"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="-25" />
                <feGaussianBlur stdDeviation="5" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.66 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect2_innerShadow_8665_35202"
                  result="effect3_innerShadow_8665_35202"
                />
              </filter>
            </defs>
          </svg>
        </span>
        <span>
          <svg
            width="318"
            height="100"
            viewBox="0 0 318 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8" filter="url(#filter0_dii_8665_35204)">
              <path
                d="M106.16 70.3909C42.065 83.8563 -10.7709 19.7862 14.654 -40.5714L17.4805 -47.2816C23.7857 -62.2498 25.4561 -78.7652 22.2757 -94.6927L20.3736 -104.219C7.69337 -167.723 70.8226 -219.783 130.75 -195.241L139.739 -191.56C154.77 -185.404 171.301 -183.899 187.196 -187.238L194.322 -188.735C258.416 -202.201 311.252 -138.131 285.827 -77.7732L283.001 -71.063C276.696 -56.0948 275.025 -39.5794 278.206 -23.6518L280.108 -14.1257C292.788 49.3782 229.659 101.438 169.732 76.8966L160.742 73.2152C145.712 67.0599 129.18 65.5546 113.285 68.8939L106.16 70.3909Z"
                fill="#FF7400"
              />
            </g>
            <defs>
              <filter
                id="filter0_dii_8665_35204"
                x="0.345843"
                y="-218.132"
                width="317.596"
                height="317.921"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="8.90386" />
                <feGaussianBlur stdDeviation="8.34737" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_8665_35204"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_8665_35204"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="5.56491" dy="8.90386" />
                <feGaussianBlur stdDeviation="10.0168" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.870833 0 0 0 0 1 0 0 0 0 0.941288 0 0 0 0.42 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect2_innerShadow_8665_35204"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="-25" />
                <feGaussianBlur stdDeviation="5" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.66 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect2_innerShadow_8665_35204"
                  result="effect3_innerShadow_8665_35204"
                />
              </filter>
            </defs>
          </svg>
        </span>
      </div>
      <div className="bg-white w-[70%] z-10 mx-auto my-auto flex  p-10 rounded-xl">
        <div className="w-full">
          <img src={Logo} className="aspect-square w-[80px]" />
          <div className="mt-5 font-inter">
            <p className="font-extrabold text-primary text-lg">
              Admin Panel Login
            </p>
            <p className="text-xs w-[90%] text-txtColor">
              Sign in to access powerful tools for managing user accounts,
              publishing blog posts, and maintaining community integrity.
            </p>
          </div>
        </div>
        <div className="w-full px-10 py-3 mt-10">
          <form>
            <div className="flex flex-col">
              <div className="flex flex-col gap-8">
                <Input
                  type="text"
                  className="px-5 py-2 border"
                  placeholder="Email"
                />
                <div className="px-5 rounded-md border flex items-center">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className=""
                    placeholder="Password"
                  />
                  <span
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Icon name="closeEye" />
                    ) : (
                      <Icon name="openEye" />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <Checkbox className="text-white" /> Remember me
              </div>
              <button className="bg-secondary text-white px-5 py-2 rounded-xl mt-7 font-medium">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col items-center text-txtColor mb-5 -mt-5">
        <div className="font-inter text-xs flex items-center gap-2">
          <span>Terms of Use</span>
          <span>Privacy Policy</span>
        </div>
        <p className="text-sm">Copyright © 2024 vhdo. All rights reserved</p>
      </div>
      <div className="absolute bottom-0 flex justify-between w-full">
        <span className="absolute bottom-0 -left-10">
          <svg
            width="507"
            height="450"
            viewBox="0 0 507 549"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.22"
              d="M-95.195 528.522C-174.046 467.107 -156.147 343.228 -63.1357 306.646L-52.5732 302.492C-29.7562 293.518 -10.148 277.919 3.72649 257.704C61.3511 173.746 190.246 192.37 221.747 289.206C229.332 312.522 243.723 333.033 263.066 348.099L272.021 355.074C350.872 416.488 332.972 540.368 239.961 576.949L229.399 581.104C206.582 590.078 186.974 605.677 173.099 625.891C115.475 709.85 -13.4206 691.225 -44.9218 594.389C-52.5065 571.074 -66.8971 550.562 -86.2404 535.496L-95.195 528.522Z"
              fill="#FF7400"
            />
            <g opacity="0.8" filter="url(#filter0_dii_10482_66466)">
              <path
                d="M-19.7468 555.948C-79.3841 528.877 -84.0657 445.963 -27.8549 412.351L-21.6057 408.614C-7.66581 400.278 3.45325 387.953 10.3141 373.231L14.4175 364.426C41.772 305.73 123.468 301.117 157.256 356.361L162.325 364.648C170.799 378.504 183.235 389.499 198.024 396.213L204.655 399.222C264.292 426.293 268.974 509.207 212.763 542.82L206.514 546.557C192.574 554.892 181.455 567.217 174.594 581.939L170.49 590.744C143.136 649.441 61.4397 654.053 27.6517 598.809L22.5832 590.522C14.1087 576.666 1.67294 565.671 -13.1166 558.958L-19.7468 555.948Z"
                fill="#FF7400"
              />
            </g>
            <defs>
              <filter
                id="filter0_dii_10482_66466"
                x="-75.1669"
                y="300.84"
                width="353.05"
                height="353.491"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="8.90386" />
                <feGaussianBlur stdDeviation="8.34737" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_10482_66466"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_10482_66466"
                  result="shape"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="5.56491" dy="8.90386" />
                <feGaussianBlur stdDeviation="10.0168" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.870833 0 0 0 0 1 0 0 0 0 0.941288 0 0 0 0.42 0"
                />
                <feBlend
                  mode="normal"
                  in2="shape"
                  result="effect2_innerShadow_10482_66466"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dx="25" />
                <feGaussianBlur stdDeviation="5" />
                <feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.66 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect2_innerShadow_10482_66466"
                  result="effect3_innerShadow_10482_66466"
                />
              </filter>
            </defs>
          </svg>
        </span>
        <span className="absolute bottom-0 right-0">
          <svg
            width="201"
            height="99"
            viewBox="0 0 201 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.22"
              d="M64.42 348.31C-21.6454 297.496 -19.7535 172.344 67.8084 124.155L77.7521 118.683C99.2323 106.861 116.682 88.8805 127.854 67.0556C174.255 -23.5894 304.474 -21.6209 348.114 70.3851C358.622 92.5378 375.52 111.038 396.633 123.503L406.407 129.274C492.472 180.087 490.58 305.239 403.018 353.428L393.074 358.9C371.594 370.722 354.145 388.703 342.972 410.528C296.571 501.173 166.352 499.204 122.712 407.198C112.205 385.046 95.3068 366.545 74.1937 354.08L64.42 348.31Z"
              fill="#FF7400"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
