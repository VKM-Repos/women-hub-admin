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
import { useRef, useState } from "react";

const CreateHelplineForm = () => {
  const { state } = useLocation();
  const formRef = useRef<HTMLFormElement>(null); // Form reference

  const [saveDraft, setSaveDraft] = useState(false);

  const navigate = useNavigate();
  const { mutate, isPending: pendingCreatingFAQ } = usePOST("helplines", {
    baseURL: API_BASE_URLS.supportServive,
  });

  const { mutate: updHelpline } = usePATCH(`helplines/${state?.details?.id}`, {
    baseURL: API_BASE_URLS.supportServive,
    method: "PATCH",
    callback: () => {
      toast.success("Helpline Published");
      setTimeout(() => {
        navigate("/support");
      }, 1000);
    },
  });

  saveDraft ? console.log("test") : null;

  const form = useForm<z.infer<typeof createHelplineSchema>>({
    resolver: zodResolver(createHelplineSchema),
    defaultValues: {
      name: state?.details?.name ? state.details.name : "",
      phone: state?.details?.phone ? state.details.phone : "",
      state_id: state?.details?.state_id
        ? state.details.state_id.charAt(0).toUpperCase() +
          state.details.state_id.slice(1).toLowerCase()
        : "",
      status: state?.details?.status ? state.details.status : "",
    },
  });

  function onSubmit(data: z.infer<typeof createHelplineSchema>) {
    if (state?.operation === "Edit") {
      data.status = "Active";
      updHelpline(data, {
        onSuccess: () => {
          toast.success("Published", {
            position: "bottom-right",
            style: {
              backgroundColor: "green",
              color: "white",
              textAlign: "left",
            },
            icon: "",
          });

          setSaveDraft(false);
          form.reset();
          navigate("/support");
        },
        onError: (error) => {
          setSaveDraft(false);
          console.error("Error Updating and publishing Helpline:", error);
          alert("Error Updating and publishing Helpline.");
        },
      });
    } else {
      mutate(
        { ...data, state_id: data.state_id.toUpperCase(), status: "Active" },
        {
          onSuccess: () => {
            toast.success("Published", {
              position: "bottom-right",
              style: {
                backgroundColor: "green",
                color: "white",
                textAlign: "left",
              },
              icon: "",
            });

            form.reset();
            navigate("/"); // Navigate after successful submission
          },
          onError: (error) => {
            console.error("Error creating Helpline:", error);
            toast.error("Error creating Helpline.");
          },
        }
      );
    }
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="rounded-lg  w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Header data={state} formRef={formRef} setSaveDraft={setSaveDraft} />
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
