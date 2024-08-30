import CategoryCard from "./components/CategoryCard";
import { Input } from "@/components/ui/input";
import Icon from "@/components/icons/Icon";
import { useGET } from "@/hooks/useGET.hook";
import Loading from "@/components/shared/Loading";
import { Link } from "react-router-dom";
export default function Categories() {
  const { data: categories, isPending: fetchingCategories } = useGET({
    url: "categories?size=100",
    queryKey: ["GET_CATEGORIES_IN_CATEGORIES_PAGE"],
    withAuth: true,
    enabled: true,
  });
  return (
    <>
      {fetchingCategories ? (
        <Loading />
      ) : (
        <div>
          <div className="flex justify-between items-center my-10">
            <div className="flex items-center bg-white rounded-lg px-4 w-[300px]">
              <Icon name="magnify" />
              <Input
                type="text"
                placeholder="Search category"
                className="bg-white"
              />
            </div>
            <div>
              <Link
                to="/categories-details"
                className="bg-secondary text-white flex items-center px-3 py-2 rounded-md"
                state={{
                  pageName: "Category",
                  operation: "new",
                  details: null,
                }}
              >
                <Icon name="plus" />
                New Category
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 justify-start mx-auto">
            {categories?.content?.map((category: any) => (
              <CategoryCard
                category={category}
                key={category?.id}
                bg="bg-[#E36B0C57]"
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
