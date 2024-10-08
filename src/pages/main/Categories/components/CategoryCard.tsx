import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
export default function CategoryCard({
  bg,
  category,
}: {
  bg: string;
  category: { name: string; about: string; imageUrl: string };
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-lg px-[58px] py-5 group hover:bg-gray-500 w-[235px] max-w-[235px]",
        bg
      )}
    >
      <img
        src={`https://dev.womenhub.org/api${category?.imageUrl}`}
        alt=""
        className="aspect-square object-cover"
      />
      <span className="font-semibold font-quicksand text-base mt-2 text-center">
        {category.name}
      </span>
      <Link
        to="/categories-details"
        className="absolute mt-16 group-hover:flex hidden"
        state={{ operation: "edit", details: category }}
      >
        <svg
          width="60"
          height="60"
          viewBox="0 0 84 84"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <rect width="84" height="84" rx="42" fill="white" fillOpacity="0.8" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M42.7461 51.75C42.7461 51.1977 43.1938 50.75 43.7461 50.75L51.7461 50.75C52.2984 50.75 52.7461 51.1977 52.7461 51.75C52.7461 52.3023 52.2984 52.75 51.7461 52.75L43.7461 52.75C43.1938 52.75 42.7461 52.3023 42.7461 51.75Z"
            fill="#141B34"
          />
          <path
            d="M49.0536 31.7366C47.8488 31.0677 46.3878 31.0898 45.2032 31.7943C44.8271 32.018 44.4799 32.3512 44.0427 32.8151C43.8568 33.0123 43.7639 33.1109 43.7657 33.2326C43.7675 33.3543 43.8643 33.4511 44.0579 33.6448L50.4492 40.036C50.647 40.2338 50.7459 40.3327 50.8698 40.3329C50.9936 40.3332 51.0917 40.236 51.2878 40.0416C51.7086 39.6244 52.0135 39.2862 52.2211 38.9221C52.9047 37.7226 52.9258 36.2478 52.2772 35.0287C52.0069 34.5205 51.5516 34.0557 50.8713 33.3612L50.6871 33.1731C50.0092 32.48 49.5533 32.0141 49.0536 31.7366Z"
            fill="#141B34"
          />
          <path
            opacity="0.4"
            d="M48.9827 42.263C49.1899 42.0634 49.2935 41.9636 49.2947 41.8377C49.2959 41.7118 49.1942 41.61 48.9907 41.4066L42.7326 35.1485C42.5252 34.9411 42.4215 34.8373 42.2937 34.8399C42.1659 34.8424 42.0664 34.9502 41.8675 35.1658L34.1415 43.5365C33.0215 44.7497 32.335 45.4932 31.9331 46.4181C31.5321 47.3413 31.4531 48.357 31.3239 50.0178L31.3237 50.0207C31.3235 50.0236 31.2382 51.1143 31.2514 51.3504C31.2663 51.6179 31.33 51.943 31.5782 52.2247C31.8286 52.5089 32.1452 52.6111 32.4117 52.6556C32.6436 52.6942 33.6878 52.7214 33.6899 52.7215C35.587 52.7715 36.7598 52.8023 37.8382 52.3811C38.9152 51.9605 39.7662 51.1405 41.1471 49.81L48.9827 42.263Z"
            fill="#141B34"
          />
        </svg>
      </Link>
    </div>
  );
}
