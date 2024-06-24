import { useNavigate } from "react-router-dom";
import Icon from "@/components/icons/Icon";
import { Button } from "@/components/ui/button";

export default function Back() {
  const navigate = useNavigate();

  return (
    <Button
      variant={"outline"}
      className="font-semibold flex gap-2"
      onClick={() => navigate(-1)}
    >
      <Icon name="arrowBack" /> Back
    </Button>
  );
}
