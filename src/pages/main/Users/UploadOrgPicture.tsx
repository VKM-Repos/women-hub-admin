import Tag from "@/components/dashboard/Tag";
import Icon from "@/components/icons/Icon";
import Back from "@/components/shared/backButton/Back";
import { Button } from "@/components/ui/button";
import { usePOST } from "@/hooks/usePOST.hook";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SubmitProfilePictureButton from "./components/SubmitProfilePictureButton";
import Loading from "@/components/shared/Loading";

export default function UploadOrgPicture() {
  const profileInputRef = useRef<HTMLInputElement | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const { orgId, pathname } = useParams();

  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [selectedOrgLogo, setSelectedOrgLogo] = useState<File | string>("");
  const [orgLogoPreview, setOrgLogoPreview] = useState<string | null>(null);

  const [selectedOrgCover, setSelectedOrgCover] = useState<File | string>("");
  const [orgCoverPreview, setOrgCoverPreview] = useState<string | null>(null);

  const [showModal] = useState(false);
  const [validationError] = useState(false);
  const { isPending } = usePOST(`admin/users/${orgId}/profile-photo`, {
    contentType: "multipart/form-data",
  });
  const handleChooseFile = (type: "profile" | "logo" | "cover") => {
    switch (type) {
      case "profile":
        profileInputRef.current?.click();
        break;
      case "logo":
        logoInputRef.current?.click();
        break;
      case "cover":
        coverInputRef.current?.click();
        break;
      default:
        break;
    }
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "logo" | "cover"
  ) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);

      // Set the corresponding state based on the type
      switch (type) {
        case "profile":
          setImagePreview(imageUrl);
          setSelectedFile(imageFile);
          break;
        case "logo":
          setOrgLogoPreview(imageUrl);
          setSelectedOrgLogo(imageFile);
          break;
        case "cover":
          setOrgCoverPreview(imageUrl);
          setSelectedOrgCover(imageFile);
          break;
        default:
          break;
      }
    }
  };

  // const handleSubmit = (event: any) => {.
  //   event.preventDefault();
  //   if (!selectedFile) {
  //     setValidationError(true);
  //     return;
  //   }
  //   let formData = new FormData();
  //   formData.append("photo", selectedFile);
  //   mutate(formData, {
  //     onSuccess: () => {
  //       setShowModal(true);
  //       setSelectedFile("");
  //       setImagePreview(null);
  //     },
  //     onError: (error) => {
  //       console.error("Error updating profile photo:", error);
  //       alert("Error updating profile photo.");
  //     },
  //   });
  // };

  const handleSubmit = (
    event: React.FormEvent,
    type: "profile" | "logo" | "cover"
  ) => {
    event.preventDefault();
    let selectedFileToSubmit: File | string;
    switch (type) {
      case "profile":
        selectedFileToSubmit = selectedFile;
        break;
      case "logo":
        selectedFileToSubmit = selectedOrgLogo;
        break;
      case "cover":
        selectedFileToSubmit = selectedOrgCover;
        break;
      default:
        return;
    }

    if (!selectedFileToSubmit) {
      alert("Please select an image first.");
      return;
    }

    let formData = new FormData();
    formData.append("photo", selectedFileToSubmit);

    // Simulate form submission (replace with your mutation logic)
    console.log("Submitting:", type, formData);

    // Handle form submission success and reset states
    // You should replace this with your `mutate` logic
    alert(`${type} submitted successfully`);
    resetFormState(type);
  };

  const resetFormState = (type: "profile" | "logo" | "cover") => {
    switch (type) {
      case "profile":
        setSelectedFile("");
        setImagePreview(null);
        break;
      case "logo":
        setSelectedOrgLogo("");
        setOrgLogoPreview(null);
        break;
      case "cover":
        setSelectedOrgCover("");
        setOrgCoverPreview(null);
        break;
      default:
        break;
    }
  };
  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <>
          <form onSubmit={(e) => handleSubmit(e, "profile")}>
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
                    ref={profileInputRef}
                    type="file"
                    onChange={(e) => handleImageChange(e, "profile")}
                    name="image"
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="border-2 border-[#106840]"
                    onClick={() => handleChooseFile("profile")}
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
              <Button variant="outline" className="my-5">
                Update Picture
              </Button>
            </div>
          </form>
          <form onSubmit={(e) => handleSubmit(e, "logo")}>
            <div className=" p-5 my-5 rounded-md w-[80%] mx-auto">
              <div className="flex items-center justify-between">
                <Tag title="Organization Image" color="bg-[#FF7400]" />
              </div>
              <div className="font-inter mt-7 flex items-center gap-7">
                <img
                  src={
                    orgLogoPreview ||
                    "https://placehold.co/400x400?text=Organization \n Logo"
                  }
                  alt=""
                  className={`w-28 h-28 aspect-square object-cover rounded-full ${
                    validationError ? "border-2 border-red-500" : ""
                  }`}
                />
                <div className="flex gap-10 items-center">
                  <input
                    ref={logoInputRef}
                    type="file"
                    onChange={(e) => handleImageChange(e, "logo")}
                    name="image"
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="border-2 border-[#106840]"
                    onClick={() => handleChooseFile("logo")}
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
              <Button variant="outline" className="my-5">
                Update Logo
              </Button>
            </div>
          </form>

          <form onSubmit={(e) => handleSubmit(e, "cover")}>
            <div className=" p-5 my-5 rounded-md w-[80%] mx-auto">
              <div className="bg-gray-200 h-[200px] rounded-md flex justify-center items-center w-full">
                <img
                  src={
                    orgCoverPreview ||
                    "https://placehold.co/400x400?text=Organization \n cover image"
                  }
                  alt=""
                  className="h-[200px] max-h-[200px] w-full object-cover rounded-md aspect-auto"
                />
                <input
                  ref={coverInputRef}
                  type="file"
                  onChange={(e) => handleImageChange(e, "cover")}
                  name="image"
                  className="hidden"
                  accept="image/*"
                />
                <Button
                  variant="outline"
                  className="flex items-center gap-2 absolute"
                  onClick={() => handleChooseFile("cover")}
                  type="button"
                >
                  <Icon name="upload" /> Click or drop image
                </Button>
              </div>
              {validationError && (
                <p className="text-xs text-red-500 px-1 mt-1">
                  Image field is required
                </p>
              )}
              <Button variant="outline" className="my-5">
                Update cover image
              </Button>
            </div>
          </form>
          <form onSubmit={(e) => handleSubmit(e, "profile")}>
            <div className="p-5 rounded-md w-[80%] mx-auto">
              <div className="flex items-center justify-between">
                <Tag title="Organization Gallery" color="bg-[#FF7400]" />
              </div>
              <p className="my-10 font-inter text-sm">
                You are only allowed to upload a maximum of 4 pictures
              </p>
              <div className="font-inter mt-7 flex items-center gap-7">
                <div className="bg-gray-200 h-[170px] rounded-md flex justify-center items-center w-[170px]">
                  <img
                    src={
                      orgCoverPreview ||
                      "https://placehold.co/400x400?text=Organization \n cover image"
                    }
                    alt=""
                    className="h-[170px] max-h-[170px] w-[170px] object-cover rounded-md aspect-square"
                  />
                  <input
                    ref={coverInputRef}
                    type="file"
                    onChange={(e) => handleImageChange(e, "cover")}
                    name="image"
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 absolute text-[10px]"
                    onClick={() => handleChooseFile("cover")}
                    type="button"
                  >
                    <Icon name="upload" /> Click or drop image
                  </Button>
                </div>

                <div className="bg-gray-200 h-[170px] rounded-md flex justify-center items-center w-[170px]">
                  <img
                    src={
                      orgCoverPreview ||
                      "https://placehold.co/400x400?text=Organization \n cover image"
                    }
                    alt=""
                    className="h-[170px] max-h-[170px] w-[170px] object-cover rounded-md aspect-square"
                  />
                  <input
                    ref={coverInputRef}
                    type="file"
                    onChange={(e) => handleImageChange(e, "cover")}
                    name="image"
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 absolute text-[10px]"
                    onClick={() => handleChooseFile("cover")}
                    type="button"
                  >
                    <Icon name="upload" /> Click or drop image
                  </Button>
                </div>
                <div className="bg-gray-200 h-[170px] rounded-md flex justify-center items-center w-[170px]">
                  <img
                    src={
                      orgCoverPreview ||
                      "https://placehold.co/400x400?text=Organization \n cover image"
                    }
                    alt=""
                    className="h-[170px] max-h-[170px] w-[170px] object-cover rounded-md aspect-square"
                  />
                  <input
                    ref={coverInputRef}
                    type="file"
                    onChange={(e) => handleImageChange(e, "cover")}
                    name="image"
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 absolute text-[10px]"
                    onClick={() => handleChooseFile("cover")}
                    type="button"
                  >
                    <Icon name="upload" /> Click or drop image
                  </Button>
                </div>
                <div className="bg-gray-200 h-[150px] rounded-md flex justify-center items-center w-[170px]">
                  <img
                    src={
                      orgCoverPreview ||
                      "https://placehold.co/400x400?text=Organization \n cover image"
                    }
                    alt=""
                    className="h-[170px] max-h-[170px] w-[170px] object-cover rounded-md aspect-square"
                  />
                  <input
                    ref={coverInputRef}
                    type="file"
                    onChange={(e) => handleImageChange(e, "cover")}
                    name="image"
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 absolute text-[10px]"
                    onClick={() => handleChooseFile("cover")}
                    type="button"
                  >
                    <Icon name="upload" /> Click or drop image
                  </Button>
                </div>
              </div>
              <Button variant="outline" className="my-5">
                Update Gallery
              </Button>
            </div>
          </form>
          <SubmitProfilePictureButton
            showModal={showModal}
            pathname={pathname}
          />
        </>
      )}
    </>
  );
}
