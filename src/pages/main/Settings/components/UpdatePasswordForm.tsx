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
import { PasswordFormSchema } from "@/lib/utils/formSchemas";
import { usePOST } from "@/hooks/usePOST.hook";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export function UpdatePasswordForm() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [validationStatus, setValidationStatus] = useState({
    minLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const { mutate } = usePOST("admin/settings/password");

  // Initialize form using react-hook-form with Zod validation
  const form = useForm<z.infer<typeof PasswordFormSchema>>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  // Handle form submission
  function onSubmit(data: z.infer<typeof PasswordFormSchema>) {
    mutate(data, {
      onSuccess: (returnedData) => {
        console.log(returnedData);
      },
      onError: () => {
        console.log("Error updating profile");
      },
    });
  }

  const handlePasswordChange = (e: any) => {
    const password = e.target.value;
    form.setValue("newPassword", password);

    // Update validation status based on the current password
    setValidationStatus({
      minLength: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="font-inter flex flex-col gap-7 mt-7">
          {/* Old Password Field */}
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2 items-center font-bold mb-2">
                  Old Password <Icon name="info" />
                  <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                </FormLabel>
                <FormControl>
                  <div className="flex items-center bg-input rounded-lg">
                    <Input
                      type={showOldPassword ? "text" : "password"}
                      className=""
                      {...field}
                    />
                    <Button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                    >
                      {showOldPassword ? (
                        <Icon name="eyeClose" />
                      ) : (
                        <Icon name="eyeOpen" />
                      )}
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* New Password Field with validation error loop */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="flex gap-2 items-center font-bold mb-2">
                    New Password <Icon name="info" />
                    <FormMessage className="bg-black text-white px-3 py-1 rounded-md" />
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center bg-input rounded-lg">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        className=""
                        {...field}
                        onChange={handlePasswordChange}
                      />
                      <Button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <Icon name="eyeClose" />
                        ) : (
                          <Icon name="eyeOpen" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              );
            }}
          />
        </div>

        {/* Validation Checkboxes */}
        <div className="mt-4">
          <ul className="space-y-2 grid grid-cols-3 text-xs">
            <li className="flex items-center">
              <Checkbox
                className="data-[state=checked]:text-white data-[state=checked]:bg-secondary data-[state=checked]:border-none"
                checked={validationStatus.hasLowercase}
              />
              <label
                className={`ml-2 ${
                  validationStatus.hasLowercase ? "text-secondary" : ""
                } `}
              >
                one lowercase letter
              </label>
            </li>
            <li className="flex items-center">
              <Checkbox
                className="data-[state=checked]:text-white data-[state=checked]:bg-secondary data-[state=checked]:border-none"
                checked={validationStatus.hasUppercase}
              />
              <label
                className={`ml-2 ${
                  validationStatus.hasUppercase ? "text-secondary" : ""
                } `}
              >
                one uppercase letter
              </label>
            </li>
            <li className="flex items-center">
              <Checkbox
                className="data-[state=checked]:text-white data-[state=checked]:bg-secondary data-[state=checked]:border-none"
                checked={validationStatus.hasSpecialChar}
              />
              <label
                className={`ml-2 ${
                  validationStatus.hasSpecialChar ? "text-secondary" : ""
                } `}
              >
                one special character
              </label>
            </li>
            <li className="flex items-center">
              <Checkbox
                className="data-[state=checked]:text-white data-[state=checked]:bg-secondary data-[state=checked]:border-none"
                checked={validationStatus.hasNumber}
              />
              <label
                className={`ml-2 ${
                  validationStatus.hasNumber ? "text-secondary" : ""
                } `}
              >
                one number
              </label>
            </li>
            <li className="flex items-center">
              <Checkbox
                className="data-[state=checked]:text-white data-[state=checked]:bg-secondary data-[state=checked]:border-none"
                checked={validationStatus.minLength}
              />
              <label
                className={`ml-2 ${
                  validationStatus.minLength ? "text-secondary" : ""
                } `}
              >
                8 characters minimum
              </label>
            </li>
          </ul>
        </div>

        {/* Submit Button */}
        <Button variant={"outline"} type="submit" className="mt-7">
          Update password
        </Button>
      </form>
    </Form>
  );
}
