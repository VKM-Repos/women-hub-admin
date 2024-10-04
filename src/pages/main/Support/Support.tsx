// import { Button } from "@/components/ui/button";
// import Icon from "@/components/icons/Icon";
import Tag from "@/components/dashboard/Tag";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TicketPreviewCard from "./previewCards/TicketPreviewCard";
import { ticketData } from "./mockupData/ticket-mockup-data";
import { Ticket } from "@/types/tickets.types";
import { GuidesCard } from "@/types/guideCard.type";
import { guideCardData } from "./mockupData/guideCard-mockup-data";
import GuideCard from "./components/GuideCard";

const Support = () => {
  const navigate = useNavigate();

  const tickets: Ticket[] | any = ticketData;

  const guides: GuidesCard[] | any = guideCardData;

  return (
    <>
      <div className="mb-10">
        <div className="flex justify-between">
          <div className="self-center">
            Manage and update the support content for WomenHub.
          </div>
        </div>
        <div className="flex mt-10 mb-10 ">
          {guides.map((guide: GuidesCard) => {
            return guide.id === "1" ? (
              <Link
                to="/support/a-guide-to-womenhub"
                state={{ pageName: "Header", data: guide }}
              >
                <GuideCard key={guide.id} data={guide} />
              </Link>
            ) : guide.id === "2" ? (
              <Link
                to={"/support/FAQs"}
                state={{ pageName: "Header", data: guide }}
              >
                <GuideCard key={guide.id} data={guide} />
              </Link>
            ) : (
              <Link
                to={"/support/helplines"}
                state={{ pageName: "Header", data: guide }}
              >
                <GuideCard key={guide.id} data={guide} />
              </Link>
            );
          })}
        </div>
        <div className="mt-20 mb-10">
          <div className="flex flex-col bg-white border-2 border-zinc-100 shadow-xl rounded-lg px-[24px] py-[13px] mb-10">
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

            {tickets?.map((ticket: Ticket) => {
              return <TicketPreviewCard key={ticket.id} data={ticket} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
