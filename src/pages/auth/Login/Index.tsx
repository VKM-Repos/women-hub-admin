import Logo from "@/assets/logo.svg";
import Icon from "@/components/icons/Icon";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-screen h-screen bg-[#ECECEC] flex items-center">
      <div className="bg-white w-[70%] mx-auto my-auto flex  p-10 rounded-xl">
        <div className="w-full">
          <img src={Logo} className="aspect-square w-[80px]" />
          <div className="mt-5 font-inter">
            <p className="font-bold text-primary text-lg">Admin Panel Login</p>
            <p className="text-xs w-[85%]">
              Sign in to access powerful tools for managing user accounts,
              publishing blog posts, and maintaining community integrity.
            </p>
          </div>
        </div>
        <div className="w-full px-10 py-5 mt-10">
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
    </div>
  );
}
