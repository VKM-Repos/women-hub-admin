import Tag from "@/components/dashboard/Tag";
import Back from "@/components/shared/backButton/Back";
import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import Icon from "@/components/icons/Icon";
import { Button } from "@/components/ui/button";
import { useGET } from "@/hooks/useGET.hook";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePATCH } from "@/hooks/usePATCH.hook";
import toast from "react-hot-toast";
import { generatePassword } from "@/lib/utils/passwordGenerator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const edit_user_schema = z.object({
    role: z
        .string()
        .min(1, { message: 'User type is required'}),
    name: z
        .string()
        .min(1, { message: 'Required field'})
        .max(255, { message: "Name must not exceed 255 characters" }),
    email: z
        .string()
        .email()
        .min(1, { message: 'Email is required'}),
    bio: z
        .string()
        .min(5, { message: 'Bio is required'}),
    password: z
        .string()
})

type EditUserData = z.infer<typeof edit_user_schema>

export default function EditUser() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [selectedFile, setSelectedFile] = useState<File | string>("");
    const [validationError, setValidationError] = useState(false);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const user_id = searchParams.get("id");


    const { data: user } = useGET({
        url: `admin/users/${user_id}`,
        queryKey: ['USER_DATA']
    });


    const { mutate: editUser } = usePATCH(
        `users/${user_id}`,
        { method: "PUT", contentType: "multipart/form-data" }
    );


    const defaultValues = {
        name: user?.name,
        email: user?.email,
        bio: user?.bio,
        role: user?.role.toLowerCase(),
    }


    const form = useForm<EditUserData>({ 
        resolver: zodResolver(edit_user_schema), 
        defaultValues
    })

    const [imagePreview, setImagePreview] = useState<string | null>(user?.photoUrl);

    async function handleImageChange (e: React.ChangeEvent<HTMLInputElement>) {
        const imageFile = e.target.files?.[0];
        setValidationError(false);
        if (imageFile) {
            const imageUrl = URL.createObjectURL(imageFile);
            setImagePreview(imageUrl);
            setSelectedFile(imageFile);
        }
    };

      const handleGeneratePassword = (): void => {
        const newPassword = generatePassword();
        form.setValue("password", newPassword);
      };


    const handleChooseFile = () => {
        inputRef.current?.click();
    };

    async function onSubmit(edit_user_data: z.infer<typeof edit_user_schema>) {
        if (!selectedFile) {
            setValidationError(true);
            return;
          }
        editUser(edit_user_data, {
                onSuccess: () => {
                    toast.success(`This user has been updated`)
                },
                onError: () => {
                    toast.error(`Could not update user data`)
                }
            }
        )
    }
    


    return (
        <section className="rounded-[1.25rem] mt-8 bg-[#FCFCFC] p-6 w-full max-w-[62.5rem] mx-auto flex flex-col gap-8">
            <div className="flex justify-between items-center ">
                <Tag title='User Information' color="bg-tagBgGrn" />
                <Back />
            </div>
            <div>
            <div className="font-inter flex items-center gap-7">
              <img
                src={
                  imagePreview ||
                  "https://placehold.co/400x400?text=Profile\n picture"
                }
                alt=""
                className={`w-28 h-28 aspect-square object-cover rounded-full ${
                  validationError ? "border-2 border-red-500" : ""
                }`}
              />
              <div className="flex gap-10 items-center">
                <input
                  ref={inputRef}
                  type="file"
                  onChange={handleImageChange}
                  name="image"
                  className="hidden"
                  accept="image/*"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="border-2 border-[#106840]"
                  onClick={handleChooseFile}
                >
                  <Icon name="plusGreen" />
                  <span className="text-[#106840]"> Upload Picture</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSelectedFile("");
                    setImagePreview("");
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
            {validationError && (
              <p className="text-xs text-red-500 px-1 mt-1">
                Image field is required
              </p>
            )}

            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
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
                                defaultValue={field.value}
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
                            className=" text-[#393939] rounded-lg px-6 py-[.875rem] text-base shadow-custom w-[10.75rem]"
                        >
                            <strong>Send Reset Link</strong>
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}