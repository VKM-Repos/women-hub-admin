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
import { FooterFormSchema } from "@/lib/utils/formSchemas";
import Tag from "@/components/dashboard/Tag";
import { Switch } from "@/components/ui/switch";
import { usePATCH } from "@/hooks/usePATCH.hook";

export function FooterForm({ footerData }: { footerData: any }) {
  const { mutate } = usePATCH("admin/settings/footer", true, () => {});
  const form = useForm<z.infer<typeof FooterFormSchema>>({
    resolver: zodResolver(FooterFormSchema),
    defaultValues: {
      facebookLink: footerData?.facebookLink,
      twitterLink: footerData?.twitterLink,
      linkedinLink: footerData?.linkedinLink,
      instagramLink: footerData?.instagramLink,
      privacyPolicy: footerData?.privacyPolicy,
      termsAndCondition: footerData?.termsAndCondition,
      gdprCompliance: footerData?.gdprCompliance,
    },
  });

  function onSubmit(data: z.infer<typeof FooterFormSchema>) {
    mutate(data, {
      onSuccess: (returnedData) => {
        console.log(returnedData);
      },
      onError: () => {
        console.log("Error updating Footer");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="font-inter flex flex-col gap-7">
          <Tag title="Footer" color="bg-[#B5E4CA]" />
          <span className="text-sm">
            The footer contains all contain all clickable elements for the use
            of users
          </span>
          <div className="font-inter flex justify-between gap-7 -mb-10 w-full">
            <span className="text-txtColor text-sm font-semibold flex gap-3 items-center -mb-10">
              Social Media <Icon name="info" />
            </span>
            <hr />
          </div>
          <hr />
          <FormField
            control={form.control}
            name="facebookLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 items-center font-bold mb-2">
                  Facebook Link <Icon name="info" />
                  <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                </FormLabel>
                <FormControl>
                  <div className="bg-input flex px-1 rounded-lg">
                    <Icon name="facebook" />
                    <Input {...field} />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitterLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 items-center font-bold mb-2">
                  Twitter Link <Icon name="info" />
                  <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                </FormLabel>
                <FormControl>
                  <div className="bg-input flex px-1 rounded-lg">
                    <Icon name="twitter" />
                    <Input {...field} />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedinLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 items-center font-bold mb-2">
                  LinkedIn Link <Icon name="info" />
                  <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                </FormLabel>
                <FormControl>
                  <div className="bg-input flex px-1 rounded-lg">
                    <Icon name="linkedIn" />
                    <Input {...field} />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagramLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 items-center font-bold mb-2">
                  Instagram Link <Icon name="info" />
                  <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                </FormLabel>
                <FormControl>
                  <div className="bg-input flex px-1 rounded-lg">
                    <Icon name="instagram" />
                    <Input {...field} />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <span className="font-bold text-txtColor">Legal & Compliance</span>
          <FormField
            control={form.control}
            name="privacyPolicy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between p-1">
                <div className="space-y-0.5">
                  <FormLabel className="text-sm font-bold flex items-center gap-2">
                    Privacy Policy
                    <Icon name="info" />
                  </FormLabel>
                </div>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                    <span className="text-xs">
                      {field.value ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="termsAndCondition"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between p-1">
                <div className="space-y-0.5">
                  <FormLabel className="text-sm font-bold flex items-center gap-2">
                    Terms & Condition
                    <Icon name="info" />
                  </FormLabel>
                </div>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span className="text-xs">
                      {field.value ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gdprCompliance"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between p-1">
                <div className="space-y-0.5">
                  <FormLabel className="text-sm font-bold flex items-center gap-2">
                    GDPR Compliance
                    <Icon name="info" />
                  </FormLabel>
                </div>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                    <span className="text-xs">
                      {field.value ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button variant={"outline"} type="submit" className="mt-7">
          Update
        </Button>
      </form>
    </Form>
  );
}
