import Tag2 from "@/components/dashboard/TagCircle";
import { Ticket } from "@/types/tickets.types";


type Props = {
  data: Ticket;
};

function TicketPreviewCard({ data }: Props) {
  return (
    <div className=" bg-white rounded-lg px-6 py-4 mt-3 border-2 border-zinc-100">
      <Tag2 title={`Ticket# ${data.id}`} color={data?.status === "New" ? "bg-[#FF0835]" : data?.status === "Ongoing" ? "bg-[#FF7400]": "bg-[#65B891]"} />
      <hr />
      <h1 className="font-medium mt-2">Issue with {data.issue}</h1>
      <p className="text-zinc-400 mt-2">{data.report}</p>
      <hr />
      <div className="flex justify-between">
        <p className="self-center">-{data.email}</p>
        <button className="border font-semibold rounded-xl mt-3 px-[20px] py-[12px]">
          View ticket
        </button>
      </div>
    </div>
  );
};

export default TicketPreviewCard;
