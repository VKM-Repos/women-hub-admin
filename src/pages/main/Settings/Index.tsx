import Tag from "@/components/dashboard/Tag";
import profileAvatar from "@/assets/profile-avatar.svg";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icons/Icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email." }).min(5, {
    message: "Email must be at least 5 characters.",
  }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().min(2, { message: "Bio is required." }),
});

export default function Settings() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      name: "",
      bio: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);

    // mutate(data, {
    //   onSuccess: () => {
    //     setShowModal(true);
    //   },
    //   onError: () => {
    //     // Handle error
    //   },
    // });
  };
  return (
    <div className="bg-white flex  w-full drop-shadow-md px-10 py-5 sticky">
      <div className="w-[30%] sticky">left</div>
      <div className="w-[70%] overflow-y-scroll">
        <div>
          <Tag title="Profile information" color="bg-[#B5E4CA]" />
          <div className="flex items-center gap-4 my-10">
            <img src={profileAvatar} alt="" className="rounded-full" />
            <Button className="bg-secondary text-white flex items-center gap-3">
              <Icon name="plus" /> Upload new picture
            </Button>
            <Button variant="outline">Remove</Button>
          </div>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="font-inter flex flex-col gap-7">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex gap-2 items-center font-bold mb-2">
                          Email <Icon name="info" />
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex gap-2 items-center font-bold mb-2">
                          Name <Icon name="info" />
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
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex gap-2 items-center font-bold mb-2">
                          Bio <Icon name="info" />
                          <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                        </FormLabel>
                        <FormControl>
                          <Textarea className="bg-input" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button variant="outline" className="mt-5">
                  Update Profile
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
