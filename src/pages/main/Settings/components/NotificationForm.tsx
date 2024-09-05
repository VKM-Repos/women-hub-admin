"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { usePATCH } from "@/hooks/usePATCH.hook";

const items = [
  {
    id: "postLiked",
    label: "A user likes a blog post",
  },
  {
    id: "postCommentedOn",
    label: "A user comment on a blog post",
  },
  {
    id: "newAccountCreated",
    label: "A user create an account post",
  },
  {
    id: "newsletterSubscription",
    label: "A user joins the newsletter Subscription",
  },
] as const;

const FormSchema = z.object({
  postLiked: z.boolean().default(false).optional(),
  postCommentedOn: z.boolean().default(false).optional(),
  newAccountCreated: z.boolean().default(false).optional(),
  newsletterSubscription: z.boolean().default(false).optional(),
});

export function NotificationForm({ notifications }: { notifications: any }) {
  const { mutate } = usePATCH("admin/settings/notification");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      postLiked: notifications?.postLiked,
      postCommentedOn: notifications?.postCommentedOn,
      newAccountCreated: notifications?.newAccountCreated,
      newsletterSubscription: notifications?.newsletterSubscription,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data, {
      onSuccess: (returnedData) => {
        console.log(returnedData);
      },
      onError: () => {
        console.log("Error");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <hr />
        <div className="flex justify-end">
          <div className="flex flex-col">
            {items.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item?.id}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row gap-5 items-start justify-end space-x-3 space-y-0"
                    >
                      <div className="flex-1">
                        <FormControl>
                          <Checkbox
                            className="text-white"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </div>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </div>
        <hr />
        <Button variant="outline" className="-mt-5 rounded-lg">
          Update Notification
        </Button>
      </form>
    </Form>
  );
}
