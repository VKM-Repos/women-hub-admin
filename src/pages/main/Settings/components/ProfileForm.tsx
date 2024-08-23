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
import { Textarea } from "@/components/ui/textarea";
import { ProfileFormSchema } from "@/lib/utils/formSchemas";
import { Label } from "@/components/ui/label";
import { usePOST } from "@/hooks/usePOST.hook";

export function ProfileForm({ user }: { user: any }) {
  const { mutate } = usePOST(
    "admin/settings/profile",
    true,
    "application/json",
    () => {}
  );
  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      name: user?.name || "YOLO",
      bio: user?.bio,
    },
  });

  function onSubmit(data: z.infer<typeof ProfileFormSchema>) {
    mutate(data, {
      onSuccess: (returnedData) => {
        console.log(returnedData);
      },
      onError: () => {
        console.log("Error updating profile");
      },
    });
  }
  console.log(user?.name, "yyyy");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="font-inter flex flex-col gap-7">
          <div className="grid w-full  items-center gap-1.5">
            <Label
              htmlFor="email"
              className="font-bold flex items-center gap-2"
            >
              Email
              <Icon name="info" />
            </Label>
            <Input
              type="email"
              id="email"
              disabled
              value={user?.email}
              placeholder="Email"
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 items-center font-bold mb-2">
                  Name <Icon name="info" />
                  <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                </FormLabel>
                <FormControl>
                  <Input className="bg-input" {...field} value={user?.name} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 items-center font-bold mb-2">
                  Bio <Icon name="info" />
                  <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                </FormLabel>
                <FormControl>
                  <Textarea className="bg-input" {...field} value={user?.bio} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button variant={"outline"} type="submit" className="mt-7">
          Update Profile
        </Button>
      </form>
    </Form>
  );
}
