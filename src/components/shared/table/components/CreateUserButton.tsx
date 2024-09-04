import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Tag from "@/components/dashboard/Tag";
import Icon from "@/components/icons/Icon";

const FormSchema = z.object({
  account: z.string({
    required_error: "Please select account type.",
  }),
});

export default function CreateUserButton() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { account } = data;
    switch (account) {
      case "organization":
        navigate("/create-organization");
        break;
      case "editor":
        navigate("/create-editor");
        break;
      case "user":
        navigate("/create-user");
        break;
      default:
        break;
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white bg-secondary h-12 w-[150px] flex items-center gap-2">
          <span>
            <Icon name="plus" />
          </span>
          Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Tag title="Create a New user" color="bg-[#B5E4CA]" />
          </DialogTitle>
          <DialogDescription>
            <span className="pl-10">Select a user type</span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[300px]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user">
                          <span className="flex items-center gap-2">
                            <Icon name="users" /> User
                          </span>
                        </SelectItem>
                        <hr className="m-0" />
                        <SelectItem value="organization">
                          <span className="flex items-center gap-2">
                            <Icon name="organization" />
                            Organization
                          </span>
                        </SelectItem>
                        <hr className="m-0" />
                        <SelectItem value="editor">
                          <span className="flex items-center gap-2">
                            <Icon name="editor" /> Editor
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="justify-end">
                <DialogClose asChild>
                  <Button className="text-black bg-white h-10 px-5">
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  className="text-white bg-secondary h-10 px-5 ml-7"
                  type="submit"
                >
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
