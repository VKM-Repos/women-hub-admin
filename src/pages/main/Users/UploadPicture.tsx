import Tag from "@/components/dashboard/Tag";
import Icon from "@/components/icons/Icon";
import Back from "@/components/shared/backButton/Back";
import { Button } from "@/components/ui/button";
import { usePOST } from "@/hooks/usePOST.hook";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SubmitProfilePictureButton from "./components/SubmitProfilePictureButton";
import Loading from "@/components/shared/Loading";

export default function UploadPicture() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { id, pathname } = useParams();

  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const { mutate, isPending } = usePOST(`admin/users/${id}/profile-photo`, {
    contentType: "multipart/form-data",
  });
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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!selectedFile) {
      setValidationError(true);
      return;
    }
    let formData = new FormData();
    formData.append("photo", selectedFile);
    mutate(formData, {
      onSuccess: () => {
        setShowModal(true);
        setSelectedFile("");
        setImagePreview(null);
      },
      onError: (error) => {
        console.error("Error updating profile photo:", error);
        alert("Error updating profile photo.");
      },
    });
  };
  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="bg-white p-5 rounded-md w-[80%] mx-auto">
            <div className="flex items-center justify-between">
              <Tag title="Profile Image" color="bg-[#B5E4CA]" />
              <Back />
            </div>
            <p className="my-10 font-inter text-sm">
              Upload a profile picture for this user
            </p>
            <div className="font-inter mt-7 flex items-center gap-7">
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
          <SubmitProfilePictureButton
            showModal={showModal}
            pathname={pathname}
          />
        </form>
      )}
    </>
  );
}
