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
import { Textarea } from "@/components/ui/textarea";
import { CategoryFormSchema } from "@/lib/utils/formSchemas";
// import { usePOST } from "@/hooks/usePOST.hook";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Tag from "@/components/dashboard/Tag";
import { useRef, useState } from "react";
import { usePOST } from "@/hooks/usePOST.hook";
import toast from "react-hot-toast";
import { usePATCH } from "@/hooks/usePATCH.hook";
import Back from "@/components/shared/backButton/Back";
import { useDELETE } from "@/hooks/useDelete.hook";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

export function CategoryForm({ state }: { state: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [validationError, setValidationError] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPending: pendingCreatingCategory } = usePOST(
    "admin/categories",
    true,
    "multipart/form-data",
    () => {}
  );

  const { mutate: updateCategory, isPending: pendingUpdatingCategory } =
    usePATCH(
      `admin/categories/${state.details?.id}`,
      true,
      () => {},
      "multipart/form-data",
      "PATCH"
    );
  const { mutate: deleteCategory, isPending: pendingDeletingCategory } =
    useDELETE(`admin/categories/${state.details?.id}`, true, () => {});

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    setValidationError(false);
    if (imageFile) {
      // Update the logo in the store with the URL
      const imageUrl = URL.createObjectURL(imageFile);
      setImagePreview(imageUrl);
      setSelectedFile(imageFile);
    }
  };
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: state.details?.name ? state.details.name : "",
      about: state.details?.about ? state.details.about : "",
    },
  });

  function onSubmit(data: z.infer<typeof CategoryFormSchema>) {
    toast.success(
      `${
        state.operation == "new" ? "Publishing" : "Updating"
      }  category.........`,
      {
        position: "bottom-right",
        style: {
          backgroundColor: "green",
          color: "white",
          textAlign: "left",
        },
        icon: "",
      }
    );
    if (!selectedFile) {
      setValidationError(true);
      return;
    }
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("about", data.about);
    formData.append("image", selectedFile);
    if (state.operation == "new") {
      mutate(formData, {
        onSuccess: () => {
          setSelectedFile("");
          setImagePreview(null);
          toast.success("Published", {
            position: "bottom-right",
            style: {
              backgroundColor: "green",
              color: "white",
              textAlign: "left",
            },
            icon: "",
          });

          setIsOpen(false);
          form.reset();
        },
        onError: (error) => {
          console.error("Error creating Category:", error);
          alert("Error creating Category.");
        },
      });
    } else if (state.operation == "edit") {
      updateCategory(formData, {
        onSuccess: () => {
          toast.success("Updated", {
            position: "bottom-right",
            style: {
              backgroundColor: "green",
              color: "white",
              textAlign: "left",
            },
            icon: "",
          });
          setIsOpen(false);
        },
        onError: (error) => {
          console.error("Error updating Category:", error);
          alert("Error updating Category.");
        },
      });
    }
  }
  const handleDelete = () => {
    deleteCategory(
      {},
      {
        onSuccess: () => {
          toast.success("Deleted", {
            position: "bottom-right",
            style: {
              backgroundColor: "red",
              color: "white",
              textAlign: "left",
            },
            icon: "",
          });
          setIsDeleteOpen(false);
          setIsOpen(false);
          form.reset();
          navigate(-1);
        },
        onError: (error) => {
          console.error("Error deleting Category:", error);
          alert("Error deleting Category.");
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <div className="flex items-center justify-between mb-10">
          <Tag title="Category Information" color="bg-[#B5E4CA]" />

          <div className="flex items-center gap-3">
            <Back />
            {state.operation == "edit" && (
              <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    // id="confirmModal"
                    className="text-[#D4082D] px-5 py-2"
                  >
                    <Icon name="delete" />
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="sm:max-w-[425px]"
                  onInteractOutside={(e) => e.preventDefault()}
                >
                  <DialogHeader>
                    <DialogTitle>
                      <div className="mb-2">
                        <Tag title="Delete Category" color="bg-[#FFBC99]" />
                      </div>
                    </DialogTitle>
                    <hr />
                    <DialogDescription>
                      <span className="text-[14px] mt-4 text-txtColor font-inter">
                        {" "}
                        This will delete this category. You will no longer be
                        able to view or edit it once deleted.
                      </span>
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="justify-center">
                    <div className="flex items-center justify-center gap-5">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        onClick={handleDelete}
                        className="bg-secondary text-white px-5 py-2 rounded-md"
                        disabled={pendingDeletingCategory}
                      >
                        Confirm
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 my-10">
          <img
            src={
              imagePreview ||
              "https://placehold.co/400x400?text=Category\n picture"
            }
            alt=""
            className={`rounded-full w-28 h-28 aspect-square object-cover ${
              validationError ? "border-2 border-red-500" : ""
            }`}
          />
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
            onClick={handleChooseFile}
            className="bg-secondary text-white flex items-center gap-3"
          >
            <Icon name="plus" /> Upload new picture
          </Button>
          <Button
            type="button"
            onClick={() => {
              setSelectedFile("");
              setImagePreview("");
            }}
            variant="outline"
          >
            Remove
          </Button>
        </div>
        {validationError && (
          <p className="text-xs text-red-500 px-1 mt-1">
            Image field is required
          </p>
        )}
        <div className="font-inter flex flex-col gap-7">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 items-center font-bold mb-2">
                  Category Name <Icon name="info" />
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
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 items-center font-bold mb-2">
                  About Category <Icon name="info" />
                  <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                </FormLabel>
                <FormControl>
                  <Textarea className="bg-input" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="relative  w-[120%]">
          <div className="flex items-center justify-between absolute mt-[50px] -left-16 bg-white w-full  py-4 px-5">
            <Icon name="check" />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  // id="confirmModal"
                  className="bg-secondary text-white px-5 py-2"
                  disabled={
                    !form.getValues().name ||
                    !form.getValues().about ||
                    !selectedFile
                  }
                >
                  Publish
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[425px]"
                onInteractOutside={(e) => e.preventDefault()}
              >
                <DialogHeader>
                  <DialogTitle>
                    <div className="mb-2">
                      <Tag title="Publish Category" color="bg-[#FFBC99]" />
                    </div>
                  </DialogTitle>
                  <hr />
                  <DialogDescription>
                    <span className="text-[14px] mt-4 text-txtColor font-inter">
                      {" "}
                      This will add a new category to the category's page on the
                      womenHub website, do you want to continue?
                    </span>
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="justify-center">
                  <div className="flex items-center justify-center gap-5">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      onClick={form.handleSubmit(onSubmit)}
                      className="bg-secondary text-white px-5 py-2 rounded-md"
                      disabled={
                        pendingCreatingCategory || pendingUpdatingCategory
                      }
                    >
                      Confirm
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </form>
    </Form>
  );
}
