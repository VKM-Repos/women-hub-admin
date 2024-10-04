import Icon from "@/components/icons/Icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
// import Back from "@/components/shared/backButton/Back";
import MoreOptions from "@/components/common/dropdowns/MoreOptions";
import { AlertGoBack } from "./GoBack";

type Props = {
  data?: any;
  setSaveDraft?: (value: boolean) => void;
  formRef?: React.RefObject<HTMLFormElement>;
  handleGoBack?: () => void;
};

type OptionsMenu = {
  title: string;
  isButton: boolean;
  type: string;

  onClick: () => void;
};

const Header = ({ data, formRef, setSaveDraft, handleGoBack }: Props) => {
  const handlePublish = () => {};

  const handleUpdate = () => {};

  const menu: OptionsMenu[] = [
    {
      title: "Save to drafts",
      isButton: true,
      type: "submit",
      onClick: () => {
        if (formRef?.current) {
          if (setSaveDraft) {
            setSaveDraft(true); // Call only if setSaveDraft exists
          }
          // Ensure form submits after the state change
          setTimeout(() => {
            formRef?.current?.requestSubmit();
          }, 0);
        }
      },
    },
    ...(data?.details?.status === "Draft"
      ? [
          {
            title: "Update",
            isButton: true,
            type: "submit",
            onClick: () => {
              if (formRef?.current) {
                if (setSaveDraft) {
                  setSaveDraft(true); // Call only if setSaveDraft exists
                }
                // Ensure form submits after the state change
                setTimeout(() => {
                  formRef?.current?.requestSubmit();
                }, 0);
              }
            },
          },
        ]
      : []),
  ];

  return (
    <header className="flex items-center bg-white w-full rounded-lg justify-between min-h-[5rem] p-4">
      <div className="w-full max-w-sm flex items-center justify-start gap-4">
        <div className="w-[20px] h-[40px] bg-[#B5E4CA] rounded"></div>
        <h2 className="text-xl font-semibold w-full max-w-lg truncate">
          {data?.operation === "new"
            ? data?.pageName === "guideline"
              ? "Add Article"
              : data?.pageName === "faq"
              ? "Add FAQ"
              : "Add New Helpline"
            : data?.pageName === "Header"
            ? "Header Information"
            : "Edit Article"}
        </h2>
      </div>
      <div className=" col-span-1 flex items-center justify-end gap-x-4">
        {/* <Back /> */}

        <AlertGoBack onClick={handleGoBack} />

        {data?.pageName !== "Header" && data?.pageName !== "helpline" ? (
          <>
            <Link
              to={`/preview/1`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "flex items-center gap-1"
              )}
            >
              <Icon name="eyeIcon" />
              <span>Preview</span>
            </Link>
            <Button
              onClick={() => {
                data?.details?.id && data?.details?.status !== "DRAFT"
                  ? handleUpdate?.()
                  : handlePublish?.();
              }}
              variant="outline"
              className="flex items-center gap-1"
            >
              {data?.details?.id && data?.details?.status !== "DRAFT" ? (
                <Icon name="publishIcon" />
              ) : (
                <Icon name="publishIcon" />
              )}
              <span>
                {data?.details?.id && data?.details?.status !== "Draft"
                  ? "Update"
                  : "Publish"}
              </span>
            </Button>
            <MoreOptions label="more options" menu={menu} />
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
