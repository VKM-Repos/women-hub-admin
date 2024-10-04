import CustomFormField, {
  FormFieldType,
} from "@/components/form/custom-form-fields";
import Icon from "@/components/icons/Icon";
import { useForm } from "react-hook-form";
import { createHelplineSchema } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { stateList } from "@/lib/utils/stateList";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePOST } from "@/hooks/usePOST.hook";
import { API_BASE_URLS } from "@/config/api.config";
import { useLocation } from "react-router-dom";
import { usePATCH } from "@/hooks/usePATCH.hook";
import Header from "../Header";
import { useRef } from "react";

const CreateHelplineForm = () => {
  const { state } = useLocation();
  const formRef = useRef<HTMLFormElement>(null); // Form reference

  const navigate = useNavigate();
  const { mutate, isPending: pendingCreatingFAQ } = usePOST("helplines", {
    baseURL: API_BASE_URLS.supportServive,
  });

  const { mutate: updHelpline } = usePATCH(`helplines/${state?.details?.id}`, {
    baseURL: API_BASE_URLS.supportServive,
    method: "PATCH",
  });

  const formatStateId = (stateId: string) => {
    return stateId
      .toLowerCase() // Convert the whole string to lowercase
      .split(" ") // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join the words back into a single string
  };

  const form = useForm<z.infer<typeof createHelplineSchema>>({
    resolver: zodResolver(createHelplineSchema),
    defaultValues: {
      name: state?.details?.name ? state.details.name : "",
      phone: state?.details?.phone
        ? state.details.phone.replace(/[^+\d]/g, "")
        : "",
      state_id: state?.details?.state_id
        ? formatStateId(state.details.state_id)
        : "",
      status: state?.details?.status ? state.details.status : "",
    },
  });

  function onSubmit(data: z.infer<typeof createHelplineSchema>) {
    if (state?.operation === "Edit") {
      // data.status = "Active";
      updHelpline(
        {
          ...data,
          state_id: data.state_id.toUpperCase(),
          status: state?.details?.status,
        },
        {
          onSuccess: () => {
            form.reset();
            navigate(-1);
            toast.success("Helpline has been updated");
          },
          onError: (error) => {
            console.error("Error Updating and publishing Helpline:", error);
            toast.error("Failed updating Helpline.");
          },
        }
      );
    } else {
      mutate(
        { ...data, state_id: data.state_id.toUpperCase(), status: "Active" },
        {
          onSuccess: () => {
            form.reset();
            navigate(-1); // Navigate after successful submission
            toast.success("Helpline has been added.");
          },
          onError: (error) => {
            console.error("Error creating Helpline:", error);
            toast.error("Failed Creating Helpline.");
          },
        }
      );
    }
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="rounded-lg  w-full"
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission on Enter key
          }
        }}
      >
        <Header data={state} formRef={formRef} handleGoBack={handleGoBack} />
        <div className="p-6 pb-[4rem] flex flex-col gap-y-6 bg-white">
          <FormField
            control={form.control}
            name="state_id"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <FormLabel className="mb-2 flex items-center gap-2 font-bold">
                    State <Icon name="info" />
                    <FormMessage className="bg-black rounded-md px-3 py-1 text-white" />
                  </FormLabel>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stateList.map((state) => (
                      <SelectItem value={state}>
                        <span className="flex items-center gap-2">{state}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Helpline Name */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder=""
            label="Helpline Name"
          />

          {/* Phone Number */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="phone"
            placeholder=""
            label="Phone Number"
          />
        </div>

        <section className="flex h-full min-h-[5rem] w-full items-center mt-2 justify-between rounded-br-lg rounded-bl-lg bg-white shadow p-6">
          <Icon name="check" />
          <Button
            variant="secondary"
            size="lg"
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={pendingCreatingFAQ}
          >
            {/* <div className="mr-2">
              <Icon name="saveSupportIcon" />
            </div> */}
            {state?.operation === "Edit" ? (
              "Update"
            ) : (
              <div className="flex items-center">
                <div className="mr-2">
                  <Icon name="saveSupportIcon" />
                </div>
                <span>Save</span>
              </div>
            )}
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default CreateHelplineForm;
