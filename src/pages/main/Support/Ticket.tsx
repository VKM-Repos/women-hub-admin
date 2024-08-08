import Tag2 from "@/components/dashboard/TagCircle";

interface TicketData {
  id: any;
  issue: any;
  report: any;
  email: any;
  status: any;
}

interface TicketProps {
  data: TicketData;
}

const Ticket: React.FC<TicketProps> = ({ data }) => {
  return (
    <div className=" bg-white rounded-lg px-6 py-4 mt-3 border-2 border-zinc-100">
      <Tag2 title={`Ticket# ${data.id}`} color="tagBgOrg" />
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

export default Ticket;
