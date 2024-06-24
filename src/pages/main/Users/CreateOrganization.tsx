import Tag from "@/components/dashboard/Tag";
import Back from "@/components/shared/backButton/Back";
import UserDetailsForm from "./components/UserDetailsForm";
import SubmitButton from "./components/SubmitButton";
import OrganizationDetailsForm from "./components/OrganizationDetailsForm";

export default function CreateOrganization() {
  return (
    <div>
      <div className="bg-white p-5 rounded-md w-[80%] mx-auto">
        <div className="flex items-center justify-between">
          <Tag title="User Information" />
          <Back />
        </div>
        <UserDetailsForm />
        <OrganizationDetailsForm />
      </div>
      <SubmitButton />
    </div>
  );
}
