import { Button } from "@/components/ui/button";
import Icon from "@/components/icons/Icon";
import Tag from "@/components/dashboard/Tag";
import Ticket from "./Ticket";
import { Link } from "react-router-dom";
import GettingStart from "@/assets/images/Getting started.png";
import FAQ from "@/assets/images/FAQ.png";
import HELPLINES from "@/assets/images/HELPLINES.png";
import { useNavigate } from "react-router-dom";

const tickets = [
  {
    id: "202406-A01",
    issue: "Registration",
    report: `I receive internal error whenever i try to sign up and i have tried
      refreshing my browser but nothing has changed. I receive internal error
      whenever i try to sign up and i have tried refreshing my browser but
      nothing has changed`,
    email: "joe@gmail.com",
    status: "read",
  },
  {
    id: "202406-A02",
    issue: "Registration",
    report: `I receive internal error whenever i try to sign up and i have tried
      refreshing my browser but nothing has changed. I receive internal error
      whenever i try to sign up and i have tried refreshing my browser but
      nothing has changed`,
    email: "joe@gmail.com",
    status: "read",
  },
  {
    id: "202406-A03",
    issue: "Registration",
    report: `I receive internal error whenever i try to sign up and i have tried
      refreshing my browser but nothing has changed. I receive internal error
      whenever i try to sign up and i have tried refreshing my browser but
      nothing has changed`,
    email: "joe@gmail.com",
    status: "read",
  },
  {
    id: "202406-A04",
    issue: "Registration",
    report: `I receive internal error whenever i try to sign up and i have tried
      refreshing my browser but nothing has changed. I receive internal error
      whenever i try to sign up and i have tried refreshing my browser but
      nothing has changed`,
    email: "joe@gmail.com",
    status: "read",
  },
];

const Support = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mb-10">
        <div className="flex justify-between">
          <div className="self-center">
            Manage and update the support content for WomenHub.
          </div>
          <div>
            <Button className="text-white bg-secondary h-12 w-[150px] text-base flex items-center gap-2 rounded-[12px]">
              <span>
                <Icon name="plus" />
              </span>
              Add new
            </Button>
          </div>
        </div>
        <div className="flex mt-10 mb-10 ">
          <Link to={"/support/a-guide-to-womenhub"}>
            <div className=" w-[300px] h-[251.16px] mr-8 px-[11.63px]">
              <div className="w-[290.09px]  hover:w-[300px] hover:h-[150px] transition-all duration-300">
                <img src={GettingStart} className="aspect-auto object-cover" />
              </div>

              <h1 className="text-sm/[17.45px] text-primary font-normal mt-4 mb-4">
                A Guide to Women Hub
              </h1>
              <p className="text-sm/[11.63px] text-txtColor leading-4 font-normal mt-4 mb-4">
                Learn about our community guidelines and policies to ensure a
                safe and welcoming environment for everyone.
              </p>
              <p className="text-sm/[11.63px] text-secondary leading-4 font-normal mt-4 mb-4">
                View guidelines
              </p>
            </div>
          </Link>
          <Link to={"/support/FAQs"}>
            <div className=" w-[300px] h-[251.16px] mr-8 px-[11.63px]">
              <div className="w-[290.09px]  hover:w-[300px] hover:h-[150px] transition-all duration-300">
                <img src={FAQ} className="" />
              </div>
              <h1 className="text-sm/[17.45px] text-primary font-normal mt-4 mb-4">
                FAQs
              </h1>

              <p className="text-sm/[11.63px] text-txtColor leading-4 font-normal mt-4 mb-4">
                Find answers to common questions and learn more about how to use
                Women Hub effectively.
              </p>
              <p className="text-sm/[11.63px] text-secondary leading-4 font-normal mt-4 mb-4">
                View FAQ’s
              </p>
            </div>
          </Link>
          <Link to={"/support/helplines"}>
            <div className=" w-[300px] h-[251.16px] mr-8 px-[11.63px]">
              <div className="w-[290.09px]  hover:w-[300px] hover:h-[150px] transition-all duration-300">
                <img src={HELPLINES} className="aspect-auto object-cover" />
              </div>

              <h1 className="text-sm/[17.45px] text-primary font-normal mt-4 mb-4">
                Helplines
              </h1>
              <p className="text-sm/[11.63px] text-txtColor leading-4 font-normal mt-4 mb-4">
                Helpline provides access to various emergency contacts dedicated
                to supporting women in times of crisis.
              </p>
              <p className="text-sm/[11.63px] text-secondary leading-4 font-normal mt-4 mb-4">
                View Helplines
              </p>
            </div>
          </Link>
        </div>
        <div className="mt-20 mb-10">
          <div className="flex flex-col bg-white border-2 border-zinc-100 shadow-xl rounded-lg px-5 mb-10">
            <div className="flex justify-between mb-4">
              <div className="self-center">
                <Tag title="Support Ticket" color="bg-[#B5E4CA]" />
              </div>
              <div>
                <button
                  className="border px-[20px] py-[12px] rounded-xl mt-3 font-semibold"
                  onClick={() => navigate("/support/tickets")}
                >
                  View all tickets
                </button>
              </div>
            </div>

            {tickets?.map((ticket) => {
              return <Ticket key={ticket.id} data={ticket} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
