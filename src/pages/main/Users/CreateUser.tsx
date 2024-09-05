import Tag from "@/components/dashboard/Tag";
import Back from "@/components/shared/backButton/Back";
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
import SubmitButton from "./components/SubmitButton";
import Icon from "@/components/icons/Icon";
import { Textarea } from "@/components/ui/textarea";
import { generatePassword } from "@/lib/utils/passwordGenerator";
import { useState } from "react";
import Loading from "@/components/shared/Loading";
import { usePOST } from "@/hooks/usePOST.hook";
import { useLocation } from "react-router-dom";

const FormSchema = z.object({
  email: z.string().email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().min(2, { message: "Bio is required." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export default function CreateUser() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState("");
  const { pathname } = useLocation();
  const { mutate, isPending } = usePOST("admin/users");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      name: "",
      bio: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutate(data, {
      onSuccess: (returnedData) => {
        setUser(returnedData.id);
        setShowModal(true);
      },
      onError: () => {
        // Handle error
      },
    });
  };

  const handleSetShpwModal = () => {
    setShowModal(!showModal);
  };
  const handleResetForm = () => {
    form.reset();
  };
  const handleGeneratePassword = (): void => {
    const newPassword = generatePassword();
    form.setValue("password", newPassword);
  };

  return (
    <div>
      {isPending && <Loading />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bg-white p-5 rounded-md w-[80%] mx-auto">
            <div className="flex items-center justify-between">
              <Tag title="User Information" color="bg-[#B5E4CA]" />
              <Back />
            </div>
            <div className="font-inter mt-7 flex flex-col gap-7">
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-2 items-center font-bold mb-2">
                      Password <Icon name="info" />
                      <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          className="bg-input"
                          {...field}
                          value={field.value || ""}
                        />
                        <Button
                          type="button"
                          onClick={handleGeneratePassword}
                          className="bg-[#393939] text-white rounded-l-none"
                        >
                          Generate
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <SubmitButton
            showModal={showModal}
            handleSetShpwModal={handleSetShpwModal}
            handleResetForm={handleResetForm}
            userId={user}
            pathname={pathname}
          />
        </form>
      </Form>
    </div>
  );
}
