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
import UpdateUserButton from "../buttons/UpdateUserButton";
import Loading from "@/components/shared/Loading";
import EditForm from "./components/EditForm";

const edit_org_schema = z.object({
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

type EditOrganizationData = z.infer<typeof edit_org_schema>

export default function EditOrganization() {
    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const org_id = searchParams.get("id");
    const { pathname } = useParams();
    
    const { data: organization, isPending: updatingOrg } = useGET({
        url: `admin/organizations/${org_id}`,
        queryKey: ["ORGANIZATION_DATA"],
    });
    
    

    const [fileState, setFileState] = useState({
        selectedFile: null as File | null,
        imagePreview: organization?.photoUrl || "",
        validationError: false,
    });
    
    const form = useForm<EditOrganizationData>({
        resolver: zodResolver(edit_org_schema),
    });
    
    useEffect(() => {
        if (organization) {
            form.reset({
                name: organization.name || "",
                email: organization.email || "",
                bio: organization.bio || "",
                role: organization.role?.toLowerCase() || "",
            });
        }
    }, [organization, form]);
    
    
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
        {updatingOrg ? 
            <Loading />
        : 
        <section>
            <div className="rounded-[1.25rem] mt-8 bg-[#FCFCFC] p-6 w-full max-w-[62.5rem] mx-auto flex flex-col gap-8">
                <div className="flex justify-between items-center ">
                    <Tag title='Organization Information' color="bg-tagBgGrn" />
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
               <EditForm 
                    endpoint={`/admin/organizations/${org_id}`} 
                    entityName="Organization" 
                    initialData={organization} 
                    formRef={formRef}/>

            </div>
            <UpdateUserButton 
                showModal={false} 
                pathname={pathname} 
                handleExternalSubmit={handleExternalSubmit} />
        </section>
        }
        </>
    )
}