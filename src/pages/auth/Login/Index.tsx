import Logo from "@/assets/logo.svg";
import Icon from "@/components/icons/Icon";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "@/lib/store/app.store";
import { usePOST } from "@/hooks/usePOST.hook";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email field is required !" })
    .email({ message: "Please enter a valid email address !" }),
  password: z.string().min(1, { message: "Password field is required !" }),
});
export default function Login() {
  const { login } = useAppStore();
  const navigate = useNavigate();
  function loginCallBack(data: any) {
    login(data, true);
    navigate("/");
  }
  const { mutate, isPending } = usePOST(
    "auth/admin/token",
    false,
    "application/json",
    loginCallBack
  );
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data);
  }
  // if (loggedIn) return navigate("/home");
  return (
    <div className="w-screen h-screen bg-[#ECECEC] flex flex-col justify-center ">
      <div className="flex gap-[480px] absolute -top-10">
        <span className="relative">
          <Icon name="topLeftLoginIcon" />
        </span>
        <span>
          <Icon name="topRightLoginIcon" />
        </span>
      </div>
      <div className="bg-white w-[70%] z-10 mx-auto my-auto flex  p-10 rounded-xl">
        <div className="w-full">
          <img src={Logo} className="aspect-square w-[80px]" />
          <div className="mt-5 font-inter">
            <p className="font-extrabold text-[#106840] text-lg">
              Admin Panel Login
            </p>
            <p className="text-xs w-[90%] text-txtColor">
              Sign in to access powerful tools for managing user accounts,
              publishing blog posts, and maintaining community integrity.
            </p>
          </div>
        </div>
        <div className="w-full px-10 py-3 mt-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-7">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          className="px-5 py-2 border"
                          {...field}
                          {...register("email")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="pr-2 rounded-md border flex items-center">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="pl-5"
                            {...field}
                            {...register("password")}
                          />
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-3 mt-3">
                <Checkbox className="text-white" /> Remember me
              </div>
              <div className="flex w-full">
                <Button
                  type="submit"
                  className="bg-secondary text-white px-5 py-2 rounded-xl mt-7 w-full font-medium"
                  disabled={isPending}
                >
                  {isPending ? "Please wait..." : "Sign In"}
                </Button>
              </div>
            </form>
          </Form>
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
          <Icon name="bottomLeftLoginIcon" />
        </span>
        <span className="absolute bottom-0 right-0">
          <Icon name="bottomRightLoginIcon" />
        </span>
      </div>
    </div>
  );
}
