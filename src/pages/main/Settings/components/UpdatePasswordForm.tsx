"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Icon from "@/components/icons/Icon";
import { PasswordFormSchema } from "@/lib/utils/formSchemas";
import { usePOST } from "@/hooks/usePOST.hook";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export function UpdatePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate } = usePOST("admin/settings/password");
  const form = useForm<z.infer<typeof PasswordFormSchema>>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof PasswordFormSchema>) {
    mutate(data, {
      onSuccess: (returnedData) => {
        console.log(returnedData);
      },
      onError: () => {
        console.log("Error updating profile");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="font-inter flex flex-col gap-7 mt-7">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 items-center font-bold mb-2">
                  Old Password <Icon name="info" />
                  <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                </FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="bg-input"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 items-center font-bold mb-2">
                  New Password <Icon name="info" />
                  <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                </FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    className=""
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            className="text-white"
            checked={showPassword}
            onCheckedChange={() => setShowPassword(!showPassword)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show Password
          </label>
        </div>
        <Button variant={"outline"} type="submit" className="mt-7">
          Update password
        </Button>
      </form>
    </Form>
  );
}
