import { CategoryForm } from "./components/CategoryForm";
import { useLocation } from "react-router-dom";

export function CategoryDetails() {
  const { state } = useLocation();

  return (
    <>
      <div className="w-[80%] max-w-[80%] mx-auto bg-white rounded-md p-5">
        <CategoryForm state={state} />
      </div>
    </>
  );
}
