import { usePATCH } from "@/hooks/usePATCH.hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import toast from "react-hot-toast";
import { LegacyRef, useEffect } from "react";
import Icon from "@/components/icons/Icon";
import { generatePassword } from "@/lib/utils/passwordGenerator";

interface EditFormProps {
  endpoint: string;
  entityName: string;
  initialData: Record<string, any>;
  formRef: LegacyRef<HTMLFormElement>;
}

const edit_schema = z.object({
  role: z.string().min(1, { message: "User type is required" }),
  name: z.string().min(1, { message: "Required field" }).max(255, { message: "Name must not exceed 255 characters" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  bio: z.string().min(5, { message: "Bio is required" }),
  password: z.string().optional(),
});

type EditData = z.infer<typeof edit_schema>;

const EditForm = ({ endpoint, entityName, initialData, formRef }: EditFormProps) => {
    const { mutate: editEntity } = usePATCH(endpoint, { method: "PATCH", contentType: "application/json" });

    const form = useForm<EditData>({
        resolver: zodResolver(edit_schema),
    });

    useEffect(() => {
        if (initialData) {
        form.reset({
            name: initialData.name || "",
            email: initialData.email || "",
            bio: initialData.bio || "",
            role: initialData.role?.toLowerCase() || "",
        });
        }
    }, [initialData, form]);

    
    const handleGeneratePassword = () => {
        const newPassword = generatePassword();
        form.setValue("password", newPassword);
    };

    const onSubmit = (edit_data: EditData) => {
        editEntity(edit_data, {
        onSuccess: () => toast.success(`${entityName} has been updated`),
        onError: () => toast.error(`Could not update ${entityName}`),
        });
    };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef} className="flex flex-col gap-8">
            <div className="rounded-lg">
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex gap-2 items-center font-bold mb-2">
                        User Type <Icon name="info" />
                        <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                        </FormLabel>
                        <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                        >
                        <FormControl>
                            <SelectTrigger className="w-[23.75rem]">
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
            </div>
            <div className="rounded-lg">
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
            </div>
            <div className="rounded-lg">
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
            </div>
            <div className="rounded-lg">
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }: any) => (
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
            <div className="rounded-lg">
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
            <div className="flex flex-col gap-3">
                <FormLabel className="flex gap-2 items-center font-bold mb-2">
                    Password reset <Icon name="info" />
                    <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                </FormLabel>
                <Button
                    type="button"
                    className="cursor-pointer text-[#393939] rounded-lg px-6 py-[.875rem] text-base shadow-custom w-[10.75rem]"
                >
                    <strong>Send Reset Link</strong>
                </Button>
            </div>
        </form>
    </Form>
        
  );
};

export default EditForm;
