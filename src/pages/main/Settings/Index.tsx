import Tag from "@/components/dashboard/Tag";
import profileAvatar from "@/assets/profile-avatar.svg";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icons/Icon";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGET } from "@/hooks/useGET.hook";
import { ProfileForm } from "./components/ProfileForm";
import { UpdatePasswordForm } from "./components/UpdatePasswordForm";
import { NotificationForm } from "./components/NotificationForm";
import { FooterForm } from "./components/FooterForm";

export default function Settings() {
  const [notification, setNotification] = useState(false);
  const location = useLocation();
  const { data: notifications } = useGET({
    url: "admin/settings/notification",
    queryKey: ["GET_NOTIFICATION_SETTINGS"],
    withAuth: true,
    enabled: true,
  });
  const { data: userProfile } = useGET({
    url: "admin/settings/profile",
    queryKey: ["GET_USER_PROILE"],
    withAuth: true,
    enabled: true,
  });
  const { data: footerData } = useGET({
    url: "admin/settings/footer",
    queryKey: ["GET_FOOTER_DATA"],
    withAuth: true,
    enabled: true,
  });

  const handleCheckNotification = () => {
    setNotification(!notification);
  };
  console.log(footerData, "??????");

  return (
    <div className="bg-white flex  w-[76.5%] h-[80vh] drop-shadow-md rounded-lg px-10 py-5 fixed">
      <div className="w-[30%] sticky">
        <ul className="flex flex-col gap-4">
          <li>
            <a
              className={`flex items-center gap-5 py-1 px-4 rounded-lg ${
                location.hash == "#profile" ? "bg-[#E3FFF4]" : ""
              }`}
              href="#profile"
            >
              <Icon name="user" /> Profile
            </a>
          </li>
          <li>
            <a
              className={`flex items-center gap-5 py-1 px-4 rounded-lg ${
                location.hash == "#password-reset" ? "bg-[#E3FFF4]" : ""
              }`}
              href="#password-reset"
            >
              <Icon name="resetPassword" /> Password Reset
            </a>
          </li>
          <li>
            <a
              className={`flex items-center gap-5 py-1 px-4 rounded-lg ${
                location.hash == "#notofication" ? "bg-[#E3FFF4]" : ""
              }`}
              href="#notofication"
            >
              <Icon name="notification" /> Notification
            </a>
          </li>
          <li>
            <a
              className={`flex items-center gap-5 py-1 px-4 rounded-lg ${
                location.hash == "#footer" ? "bg-[#E3FFF4]" : ""
              }`}
              href="#footer"
            >
              {" "}
              <Icon name="link" /> Footer
            </a>
          </li>
        </ul>
      </div>
      <div className="w-[70%] overflow-y-scroll no-scrollbar smooth">
        <div id="profile">
          <Tag title="Profile information" color="bg-[#B5E4CA]" />
          <div className="flex items-center gap-4 my-10">
            <img src={profileAvatar} alt="" className="rounded-full" />
            <Button className="bg-secondary text-white flex items-center gap-3">
              <Icon name="plus" /> Upload new picture
            </Button>
            <Button variant="outline">Remove</Button>
          </div>

          {userProfile && <ProfileForm user={userProfile} />}
        </div>
        <div id="password-reset" className="my-10">
          <Tag title="Password  Reset" color="bg-[#CABDFF]" />
          <UpdatePasswordForm />
        </div>
        <hr />
        <div id="notofication" className="my-10">
          <Tag title="Notifications" color="bg-[#FFBC99]" />

          <div className="font-inter flex justify-between gap-7 mt-5 -mb-3 w-full">
            <span className="text-txtColor text-sm font-semibold flex gap-3 items-center">
              Email Whenever <Icon name="info" />
            </span>
            <Switch
              id="websiteExist"
              checked={notification}
              onCheckedChange={handleCheckNotification}
            />
          </div>
          {notification && (
            <div className="mt-5">
              <NotificationForm notifications={notifications} />
            </div>
          )}
        </div>
        <hr />
        <div id="footer" className="my-10">
          {footerData && <FooterForm footerData={footerData} />}
        </div>
      </div>
    </div>
  );
}
