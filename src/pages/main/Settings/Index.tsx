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

  const handleCheckNotification = () => {
    setNotification(!notification);
  };

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

          <ProfileForm user={userProfile} />
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
        {/* <div id="footer" className="my-10">
          <Tag title="Footer" color="bg-[#B5E4CA]" />
          <div className="my-7">
            <span className="text-sm">
              The footer contains all contain all clickable elements for the use
              of users
            </span>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="font-inter flex justify-between gap-7 -mb-3 w-full">
                <span className="text-txtColor text-sm font-semibold flex gap-3 items-center -mb-10">
                  Social Media <Icon name="info" />
                </span>
                <hr />
              </div>
              <hr />
              <div className="flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex gap-2 items-center font-bold mb-2">
                        Facebook Link <Icon name="info" />
                        <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                      </FormLabel>
                      <FormControl>
                        <div className="flex rounded-lg bg-input px-1">
                          <Icon name="facebook" />
                          <Input className="" {...field} />
                        </div>
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
                        Twitter Link <Icon name="info" />
                        <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                      </FormLabel>
                      <FormControl>
                        <div className="flex rounded-lg bg-input px-1">
                          <Icon name="twitter" />
                          <Input className="" {...field} />
                        </div>
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
                        LinkedIn Link <Icon name="info" />
                        <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                      </FormLabel>
                      <FormControl>
                        <div className="flex rounded-lg bg-input px-1">
                          <Icon name="linkedIn" />
                          <Input className="" {...field} />
                        </div>
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
                        Instagram Link <Icon name="info" />
                        <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                      </FormLabel>
                      <FormControl>
                        <div className="flex rounded-lg bg-input px-1">
                          <Icon name="instagram" />
                          <Input className="" {...field} />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <span>Legal & Complaince</span>
              <div>
                <div className="font-inter flex justify-between gap-7 mt-5 -mb-3 w-full">
                  <span className="text-txtColor text-sm font-semibold flex gap-3 items-center">
                    Privacy Policy <Icon name="info" />
                  </span>
                  <Switch
                    id="websiteExist"
                    checked={notification}
                    onCheckedChange={handleCheckNotification}
                  />
                </div>
                <hr />
                <div className="font-inter flex justify-between gap-7 mt-5 -mb-3 w-full">
                  <span className="text-txtColor text-sm font-semibold flex gap-3 items-center">
                    Terms& Condition <Icon name="info" />
                  </span>
                  <Switch
                    id="websiteExist"
                    checked={notification}
                    onCheckedChange={handleCheckNotification}
                  />
                </div>
                <hr />
                <div className="font-inter flex justify-between gap-7 mt-5 -mb-3 w-full">
                  <span className="text-txtColor text-sm font-semibold flex gap-3 items-center">
                    GDPR Cmpliance <Icon name="info" />
                  </span>
                  <Switch
                    id="websiteExist"
                    checked={notification}
                    onCheckedChange={handleCheckNotification}
                  />
                </div>
                <hr />
              </div>
              <Button variant="outline" className="mt-5 rounded-lg">
                Update
              </Button>
            </form>
          </Form>
        </div> */}
      </div>
    </div>
  );
}
