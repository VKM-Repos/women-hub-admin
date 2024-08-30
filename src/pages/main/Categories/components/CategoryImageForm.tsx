import Icon from "@/components/icons/Icon";
import { Button } from "@/components/ui/button";

export default function CategoryImageForm({ state }: { state: any }) {
  console.log(state);

  return (
    <div className="flex items-center gap-4 my-10">
      <img
        src="https://placehold.co/400x400?text=Category\n picture"
        alt=""
        className="rounded-full w-28 h-28"
      />
      <Button className="bg-secondary text-white flex items-center gap-3">
        <Icon name="plus" /> Upload new picture
      </Button>
      <Button variant="outline">Remove</Button>
    </div>
  );
}
