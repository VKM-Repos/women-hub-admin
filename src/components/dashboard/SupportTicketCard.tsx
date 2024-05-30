import avatar from "@/assets/sample.svg";
export default function SupportTicketCard() {
  return (
    <div className="font-inter font-bold">
      <div className="flex justify-between w-full items-center px-3 py-2 hover:bg-slate-200 rounded-md cursor-pointer">
        <img src={avatar} alt="" />
        <div className="flex flex-col">
          <div className="flex justify-between text-xs w-full text-txtColor">
            <p>ayo@gmail.com</p>
            <span>30m</span>
          </div>
          <p className="text-sm font-meium w-full max-w-full overflow-y-hidden">
            Issue with Registration
          </p>
        </div>
      </div>
    </div>
  );
}
