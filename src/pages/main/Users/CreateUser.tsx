import Tag from "@/components/dashboard/Tag";
import Back from "@/components/shared/backButton/Back";

import UserDetailsForm from "./components/UserDetailsForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "./components/SubmitButton";
import Icon from "@/components/icons/Icon";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  email: z.string().email().min(2, {
    message: "Email must be at least 5 characters.",
  }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().min(2, { message: "Bio is required." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});
export default function CreateUser() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  const handleOnCLick = () => {
    // Generate password logic goes here
    const password = "Generate Password";
    console.log("Generated password:", password);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bg-white p-5 rounded-md w-[80%] mx-auto">
            <div className="flex items-center justify-between">
              <Tag title="User Information" />
              <Back />
            </div>
            <div className="font-inter mt-7">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2 items-center">
                      Email <Icon name="info" />
                    </FormLabel>
                    <FormControl>
                      <Input className="bg-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2 items-center">
                      Name <Icon name="info" />
                    </FormLabel>
                    <FormControl>
                      <Input className="bg-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2 items-center">
                      Bio <Icon name="info" />
                    </FormLabel>
                    <FormControl>
                      <Textarea className="bg-input" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <SubmitButton />
        </form>
      </Form>
    </div>
  );
}
