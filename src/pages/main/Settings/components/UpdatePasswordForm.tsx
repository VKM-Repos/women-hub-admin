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

export function UpdatePasswordForm() {
  const form = useForm<z.infer<typeof PasswordFormSchema>>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof PasswordFormSchema>) {
    console.log(data);
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
                  <Input type="password" className="bg-input" {...field} />
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
                  <div className="bg-input rounded-md flex items-center justify-center w-full px-3">
                    <Input type="password" className="" {...field} />
                    <span>
                      <Icon name="eye" />{" "}
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button variant={"outline"} type="submit" className="mt-7">
          Update password
        </Button>
      </form>
    </Form>
  );
}
