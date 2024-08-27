import loadingLogo from "@/assets/loading-logo.svg";
import fixedLogo from "@/assets/fixedLogo.svg";
export default function Loading() {
  return (
    <div className="fixed w-screen h-screen inset-0 backdrop-brightness-50 flex items-center justify-center z-[2500]">
      <div className="relative flex justify-center items-center">
        <img
          src={loadingLogo}
          alt="Loading logo"
          className="rounded-full h-28 w-28 animate-spin  ease-in-out"
        />
        <img src={fixedLogo} alt="" className="absolute h-[84px] w-[84px]" />
      </div>
    </div>
  );
}
