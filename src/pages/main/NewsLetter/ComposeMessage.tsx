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
import { ComposeMessageSchema } from "@/lib/utils/formSchemas";
// import { usePOST } from "@/hooks/usePOST.hook";
import { MultiSelect } from "./components/Multi-Select";
import Tag from "@/components/dashboard/Tag";
import Back from "@/components/shared/backButton/Back";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ComposeMessage() {
  // const { mutate } = usePOST("admin/settings/profile");
  const tags = [
    {
      value: "Guest",
      label: "Guest",
    },
    {
      value: "New subscriber",
      label: "New subscriber",
    },

    {
      value: "June celebrants",
      label: "June celebrants",
    },
  ];
  const form = useForm<z.infer<typeof ComposeMessageSchema>>({
    resolver: zodResolver(ComposeMessageSchema),
    defaultValues: {
      subject: "",
      tags: [],
    },
  });

  function onSubmit(data: z.infer<typeof ComposeMessageSchema>) {
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
    <div className="w-[80%] mx-auto px-5 py-10 bg-white rounded-lg">
      <div className="flex justify-between mb-10">
        <Tag title="Compose Message" color="bg-[#B5E4CA]" />
        <div className="flex items-center gap-5">
          <Back />
          <Button variant="outline" className="flex items-center gap-2">
            <Icon name="eyeFilled" /> Preview
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Icon name="send" /> Publish
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Icon name="menuDots" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="font-inter flex flex-col gap-7">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-2 items-center font-semibold text-sm mb-5">
                    Subject
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
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-2 items-center font-semibold text-sm mb-5">
                    Tags
                    <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={tags}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select options"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="relative  w-[120%]">
            <div className="flex items-center justify-between absolute mt-[50px] -left-16 bg-white rounded-lg w-full  py-4 px-5">
              <Icon name="check" />
              <Button className="bg-secondary text-white">Next</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
