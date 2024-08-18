import MoreOptions from "@/components/common/dropdowns/MoreOptions"
import Icon from "@/components/icons/Icon"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

type Props = {
    step: number,
    title?: string,
    handleGoBack: () => void
    handleSaveToDraft: () => void
    handlePublish: () => void
    handleUpdate: () => void
}

const PostHeader = ({ step, title, handleGoBack, handleSaveToDraft, handlePublish, handleUpdate }: Props) => {


    const menu: any[] = [
        {
            title: "Save to drafts",
            isButton: true,
            onClick: () => handleSaveToDraft(),
        },
        {
            title: "Update",
            isButton: true,
            onClick: () => handleUpdate(),
        },
    ];

    return (
        <header className="flex items-center justify-between min-h-[5rem] p-4">
            <div className="w-full max-w-sm flex items-center justify-start gap-4">
                <div className="w-[20px] h-[40px] bg-[#B5E4CA] rounded"></div>
                <h2 className="text-xl font-semibold w-full max-w-lg truncate">{title ? title : 'Add post'}</h2>
            </div>
            {step > 1 && (
                <div className="flex items-center gap-3">
                    <button>
                        <Icon name='undoIcon' />
                    </button>
                    <button>
                        <Icon name='redoIcon' />
                    </button>
                    <Button onClick={handleGoBack} variant='outline' className="flex gap-1 items-center" >
                        <Icon name='arrowLeft' />
                        <span>Back</span>
                    </Button>
                    <Link to={'/posts/:postId/:previewId'} className={cn(buttonVariants({ variant: "outline" }), "flex gap-1 items-center")}>
                        <Icon name='eyeIcon' />
                        <span>Preview</span>
                    </Link>
                    <Button onClick={handlePublish} variant='outline' className="flex gap-1 items-center" >
                        <Icon name='publishIcon' />
                        <span>Publish</span>
                    </Button>
                    <MoreOptions label='more options' menu={menu} />
                </div>
            )}
        </header>
    )
}

export default PostHeader