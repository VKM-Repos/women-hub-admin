"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { CategoryFormSchema } from "@/lib/utils/formSchemas";
import Tag from "@/components/dashboard/Tag";
import Back from "@/components/shared/backButton/Back";
// import { usePOST } from "@/hooks/usePOST.hook";

import categorySample from "@/assets/category_sample.svg";
import { Button } from "@/components/ui/button";

export function CategoryDetails() {
  // const { mutate } = usePOST(
  //   "admin/settings/profile",
  //   true,
  //   "application/json",
  //   () => {}
  // );
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: "",
      about: "",
    },
  });

  function onSubmit(data: z.infer<typeof CategoryFormSchema>) {
    console.log(data);

    // mutate(data, {
    //   onSuccess: (returnedData) => {
    //     console.log(returnedData);
    //   },
    //   onError: () => {
    //     console.log("Error updating profile");
    //   },
    // });
  }

  return (
    <div className="w-[80%] mx-auto bg-white rounded-md p-5">
      <div className="flex items-center justify-between mb-10">
        <Tag title="Category Information" color="bg-[#B5E4CA]" />
        <Back />
      </div>
      <div className="flex items-center gap-4 my-10">
        <img
          src={categorySample}
          alt=""
          className="rounded-full bg-[#E36B0C57]"
        />
        <Button className="bg-secondary text-white flex items-center gap-3">
          <Icon name="plus" /> Upload new picture
        </Button>
        <Button variant="outline">Remove</Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="font-inter flex flex-col gap-7">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-2 items-center font-bold mb-2">
                    Category Name <Icon name="info" />
                    <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                  </FormLabel>
                  <FormControl>
                    <Input className="bg-input" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-2 items-center font-bold mb-2">
                    About Category <Icon name="info" />
                    <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                  </FormLabel>
                  <FormControl>
                    <Textarea className="bg-input" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
