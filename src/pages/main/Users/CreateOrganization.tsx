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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import SubmitButton from "./components/SubmitButton";
import { useState } from "react";
import { generatePassword } from "@/lib/utils/passwordGenerator";
import { usePOST } from "@/hooks/usePOST.hook";
import Icon from "@/components/icons/Icon";
import { useGET } from "@/hooks/useGET.hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { stateList } from "@/lib/utils/stateList";
import Loading from "@/components/shared/Loading";

const FormSchema = z.object({
  email: z.string().email().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().min(2, { message: "Bio is required." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  orgName: z
    .string()
    .min(5, { message: "Organization name must be at least 5 characters" }),
  orgEmail: z
    .string()
    .email()
    .min(5, { message: "Organization email must be at least" }),
  state: z.string(),
  city: z.string(),
  website: z.string(),
  orgDescription: z.string(),
  twitter: z.string(),
  facebook: z.string(),
  linkedin: z.string(),
});
export interface Category {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}
export default function CreateOrganization() {
  const [showModal, setShowModal] = useState(false);
  const [displayedCategories, setDisplayedCategories] = useState(6);
  const [categoriesId, setCategoriesId] = useState<any>([]);
  const [categoryValidationError, setCategoryValidationError] =
    useState<boolean>(false);
  const [websiteExist, setWebsiteExist] = useState(false);
  const [user, setUser] = useState("");
  const [orgId, setOrgId] = useState("");

  const { mutate, isPending } = usePOST("admin/organizations");
  const { data: categories, isPending: fetchingCategories } = useGET({
    url: "categories",
    queryKey: ["GET_CATEGORIES_IN_CREATE_ORG"],
    withAuth: true,
    enabled: true,
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      name: "",
      bio: "",
      password: "",
      orgName: "",
      orgEmail: "",
      state: "",
      city: "",
      website: "",
      orgDescription: "",
      twitter: "",
      facebook: "",
      linkedin: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (categoriesId.length < 1) {
      setCategoryValidationError(true);
      return;
    }
    const userInformation = {
      name: data.name,
      email: data.email,
      password: data.password,
      bio: data.bio,
    };

    const organizationInformation = {
      name: data.orgName,
      email: data.orgEmail,
      state: data.state,
      city: data.city,
      website: data.website,
      description: data.orgDescription,
      twitter: data.twitter,
      linkedin: data.linkedin,
      facebook: data.facebook,
      categoryIds: categoriesId,
    };

    mutate(
      { userInformation, organizationInformation },
      {
        onSuccess: (returnedData) => {
          setUser(returnedData.admin.id);
          setOrgId(returnedData.id);
          setShowModal(true);
        },
        onError: () => {
          // Handle error
        },
      }
    );
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
  const handleSeeMoreLessClick = () => {
    setDisplayedCategories((prev) =>
      prev === 6 ? categories.content.length : 6
    );
  };
  const handleCategoryClick = (event: any) => {
    const categoryId = event.target.value;
    setCategoryValidationError(false);

    setCategoriesId((prevCategories: any) => {
      if (prevCategories.includes(categoryId)) {
        // Remove the category if it already exists
        return prevCategories.filter((id: any) => id !== categoryId);
      } else {
        // Add the category if it doesn't exist
        return [...prevCategories, categoryId];
      }
    });
  };
  const handleCheck = () => {
    setWebsiteExist(!websiteExist);
  };

  return (
    <div>
      {isPending && fetchingCategories ? (
        <Loading />
      ) : (
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
                <Tag title="Organization information" color="bg-[#FF7400]" />
                <ul className="w-full flex gap-2 flex-wrap list-none">
                  {Array.isArray(categories?.content) &&
                    categories.content
                      .slice(0, displayedCategories)
                      .map((option: Category) => (
                        <li className="w-fit" key={option.id}>
                          <label className="flex flex-nowrap cursor-pointer py-1 px-2 text-sm transition-colors bg-transparent  border border-secondary rounded-lg hover:border-secondary [&:has(input:checked)]:border-secondary [&:has(input:checked)]:bg-secondary [&:has(input:checked)]:text-white">
                            <input
                              type="checkbox"
                              name="categoryIds"
                              value={option.id}
                              onChange={handleCategoryClick}
                              className="cursor-pointer hidden"
                            />
                            <span className="flex whitespace-nowrap">
                              {option.name}
                            </span>
                          </label>
                        </li>
                      ))}
                </ul>
                <span
                  className="w-full mt-2 text-right text-sm font-bold text-gray-300 cursor-pointer hover:underline"
                  onClick={handleSeeMoreLessClick}
                >
                  {displayedCategories <= 6 ? "See More" : "See Less"}
                </span>
                {categoryValidationError && (
                  <span
                    className={`mb-2 ${
                      categoryValidationError ? "text-red-600" : ""
                    } `}
                  >
                    Select atleast one category
                  </span>
                )}
                <FormField
                  control={form.control}
                  name="orgName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-2 items-center font-bold mb-2">
                        Organization Name <Icon name="info" />
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
                  name="orgEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-2 items-center font-bold mb-2">
                        Organization Email <Icon name="info" />
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
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        required
                      >
                        <FormLabel className="flex gap-2 items-center font-bold mb-2">
                          State <Icon name="info" />
                          <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                        </FormLabel>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {stateList.map((state) => (
                            <SelectItem value={state}>
                              <span className="flex items-center gap-2">
                                {state}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-2 items-center font-bold mb-2">
                        City <Icon name="info" />
                      </FormLabel>
                      <FormControl>
                        <Input className="bg-input" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex items-center w-[50%] justify-between">
                  <Label htmlFor="websiteExist" className="flex gap-2">
                    <span>Website?</span> <Icon name="info" />
                  </Label>
                  <Switch
                    id="websiteExist"
                    checked={websiteExist}
                    onCheckedChange={handleCheck}
                  />
                </div>
                {websiteExist && (
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex gap-2 items-center font-bold rounded-0  mb-2">
                          Organization URL <Icon name="info" />
                        </FormLabel>
                        <div className="flex items-center ">
                          <span className="bg-gray-200 px-2 py-2 rounded-l-md text-gray-400">
                            https://
                          </span>

                          <FormControl className="flex">
                            <Input className="bg-input rounded-0" {...field} />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="orgDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-2 items-center font-bold mb-2">
                        Organization Description <Icon name="info" />
                        <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                      </FormLabel>
                      <FormControl>
                        <Textarea className="bg-input" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Tag
                  title="Organization Social media information"
                  color="bg-[#FF7400]"
                />
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-2 items-center font-bold rounded-0  mb-2">
                        Twitter <Icon name="info" />
                      </FormLabel>
                      <FormControl className="flex">
                        <Input className="bg-input rounded-0" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-2 items-center font-bold rounded-0  mb-2">
                        Facebook <Icon name="info" />
                      </FormLabel>
                      <FormControl className="flex">
                        <Input className="bg-input rounded-0" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-2 items-center font-bold rounded-0  mb-2">
                        LinkedIn <Icon name="info" />
                      </FormLabel>
                      <FormControl className="flex">
                        <Input className="bg-input rounded-0" {...field} />
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
              orgId={orgId}
            />
          </form>
        </Form>
      )}
    </div>
  );
}
