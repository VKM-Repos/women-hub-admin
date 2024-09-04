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

const CreateHelplineForm = () => {
  const navigate = useNavigate();
  const { mutate, isPending: pendingCreatingFAQ } = usePOST(
    "helplines",
    false,
    "application/json",
    () => {}
  );

  const form = useForm<z.infer<typeof createHelplineSchema>>({
    resolver: zodResolver(createHelplineSchema),
    defaultValues: {
      name: "",
      phone: "",
      state_id: "",
    },
  });

  function onSubmit(data: z.infer<typeof createHelplineSchema>) {
    console.log(data);
    mutate(
      { phone: data.phone, state_id: data.state_id },
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

  return (
    <Form {...form}>
      <form
        className="rounded-lg  w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
            Save
          </Button>
        </section>
      </form>
    </Form>
  );
};

export default CreateHelplineForm;
