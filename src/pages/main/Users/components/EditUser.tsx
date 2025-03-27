import Tag from "@/components/dashboard/Tag";
import Back from "@/components/shared/backButton/Back";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/icons/Icon";
import { Button } from "@/components/ui/button";
import { useGET } from "@/hooks/useGET.hook";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UpdateUserButton from "./UpdateUserButton";
import Loading from "@/components/shared/Loading";
import EditForm from "./EditForm";

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
        .optional()
})

type EditUserData = z.infer<typeof edit_user_schema>

export default function EditUser() {
    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const user_id = searchParams.get("id");
    const { pathname } = useParams();
    
    const { data: user, isPending: updatingUser } = useGET({
        url: `admin/users/${user_id}`,
        queryKey: ["USER_DATA"],
    });
    
    

    const [fileState, setFileState] = useState({
        selectedFile: null as File | null,
        imagePreview: user?.photoUrl || "",
        validationError: false,
    });
    
    const form = useForm<EditUserData>({
        resolver: zodResolver(edit_user_schema),
    });
    
    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name || "",
                email: user.email || "",
                bio: user.bio || "",
                role: user.role?.toLowerCase() || "",
            });
        }
    }, [user, form]);
    
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0];
        if (imageFile) {
            setFileState({
                selectedFile: imageFile,
                imagePreview: URL.createObjectURL(imageFile),
                validationError: false,
            });
        }
    };
    
    
    const handleChooseFile = () => inputRef.current?.click();

    const handleExternalSubmit = () => {
        if (formRef.current) {
          formRef.current.requestSubmit();
        }
    };
    

    return (
        <>
        {updatingUser ? 
            <Loading />
        : 
        <section>
            <div className="rounded-[1.25rem] mt-8 bg-[#FCFCFC] p-6 w-full max-w-[62.5rem] mx-auto flex flex-col gap-8">
                <div className="flex justify-between items-center ">
                    <Tag title='User Information' color="bg-tagBgGrn" />
                    <Back />
                </div>
                <div>
                <div className="font-inter flex items-center gap-7">
                <img
                    src={
                    fileState?.imagePreview ||
                    "https://placehold.co/400x400?text=Profile\n picture"
                    }
                    alt=""
                    className={`w-28 h-28 aspect-square object-cover rounded-full ${
                    fileState?.validationError ? "border-2 border-red-500" : ""
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
                        setFileState({
                            selectedFile: null,
                            imagePreview: '',
                            validationError: false
                        })
                    }}
                    >
                    Remove
                    </Button>
                </div>
                </div>
                {fileState.validationError && (
                <p className="text-xs text-red-500 px-1 mt-1">
                    Image field is required
                </p>
                )}

                </div>
               <EditForm endpoint={`/admin/users/${user_id}`} entityName="User" initialData={user} formRef={formRef}/>

            </div>
            <UpdateUserButton showModal={false} pathname={pathname} handleExternalSubmit={handleExternalSubmit} />
        </section>
        }
        </>
    )
}