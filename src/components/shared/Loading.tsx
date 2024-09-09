import loadingLogo from "@/assets/loading-logo.svg";
import fixedLogo from "@/assets/fixedLogo.svg";
export default function Loading() {
  return (
    <div className="w-screen h-screen relative flex items-center justify-center z-[5000]">
      <div className="fixed flex items-center justify-center inset-0 bg-black/50">
        <div className="w-fit flex justify-center items-center">
          <img
            src={loadingLogo}
            alt="Loading logo"
            className="rounded-full h-28 w-28 animate-spin  ease-in-out"
          />
          <img src={fixedLogo} alt="" className="absolute h-[84px] w-[84px]" />
        </div>
      </div>
    </div>
  );
}
