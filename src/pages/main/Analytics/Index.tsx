import { ChartBarMultiple } from "./components/barchart";
import { ChartLineDefault } from "./components/linechart";
import { ChartLineMultiple } from "./components/linechart-double";
import { ChartPieDonut } from "./components/piechart";
import { ChartPieDonutTwo } from "./components/piechart-two";

export default function Analytics() {
  return (
    <div className="max-w-7xl mx-auto">

      {/* Top Right */}
      <div className="flex justify-end mb-4">
        <button className="bg-white px-4 py-2 rounded-lg shadow text-sm mr-2">Export</button>
        <select className="bg-white px-3 py-2 rounded-lg shadow text-sm">
          <option>Today</option>
        </select>
      </div>

      <div className="grid grid-cols-1 justify-items-end md:grid-cols-2 gap-6">

        {/* LEFT: Top Cards */}
   
        <div className="mx-auto">
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-4 w-[730px] border mb-6">

        

            <div className="bg-[#B5FFE12B] rounded-2xl p-4 rounded-lg flex justify-between items-center h-[131px]">
              <div className="w-[384px]">
                <p className="text-sm text-gray-600 font-[Inter] font-semibold text-base leading-[100%] mb-4">Total Users</p>
                <h2 className="font-[Inter] font-medium text-2xl">180</h2>
              </div>
              <div className="bg-white rounded-full">
                <img src="src/assets/users.svg" className="" alt="" />
              </div>
            </div>

            <div className="bg-[#FAE3B8] p-4 rounded-lg flex justify-between items-center h-[131px]">
              <div className="w-[384px]">
                <p className="text-sm text-gray-600 font-[Inter] font-semibold text-base leading-[100%] mb-4">Active Users</p>
                <h2 className="font-[Inter] font-medium text-2xl">80</h2>
              </div>
              <div className="bg-white rounded-full">
                <img src="src/assets/users.svg" alt="" />
              </div>
            </div>

            <div className="bg-[#F1EAE4] p-4 rounded-lg flex justify-between items-center h-[131px]">
              <div className="w-[384px]">
                <p className="text-sm text-gray-600 font-[Inter] font-semibold text-base leading-[100%] mb-4">Organizations</p>
                <h2 className="font-[Inter] font-medium text-2xl">160</h2>
              </div>
              <div className="bg-white rounded-full">
                <img src="src/assets/organization.svg" alt="" />
              </div>
            </div>

            <div className="bg-[#D5EBFB] p-4 rounded-lg flex justify-between items-center h-[131px]">
              <div className="w-[384px]">
                <p className="text-sm text-gray-600 font-[Inter] font-semibold text-base leading-[100%] mb-4">Active Organizations</p>
                <h2 className="font-[Inter] font-medium text-2xl">16</h2>
              </div>
              <div className="bg-white rounded-full">
                <img src="src/assets/organization.svg" alt="" />
              </div>
            </div>

          </div>

        <div className="w-[730px] h-[325px] grid grid-cols-1 gap-6">
          <ChartLineDefault />
          <ChartBarMultiple />
          <ChartLineMultiple />
        </div>
        
        </div>

        

        {/* RIGHT: Pie Chart */}

        <div className="flex flex-col gap-6 border">
          <div className="w-[350px] h-[420px] mb-6">
            <ChartPieDonut />
          </div>

          <div className="border w-[350px] h-[295px] bg-[#fff] p-[30px] rounded-lg shadow mt-6">
            <h3 className="font-[Inter] font-semibold text-base leading-[100%] text-[#65655E]">Top 5 Searched Keywords</h3>
            <div className="flex flex-col gap-2 mt-4 font-[Inter] font-normal text-sm text-[#65655E] p-1">
              <div className="flex flex-col justify-between gap-5">
                <p className="w-[265px]">Women Event <span className="float-right">100</span></p>
                <p className="w-[265px]">International Women’s Day <span className="float-right">50</span></p>
                <p className="w-[265px]">Domestic Violence Help line<span className="float-right">10</span></p>
                <p className="w-[265px]">Projects Page<span className="float-right">5</span></p>
              
              </div>
            </div>

          </div>

          <div className="w-[350px] h-[420px]">
            <ChartPieDonutTwo />
          </div>

        </div>
      </div>

      {/* Charts Section */}
      

    </div>
  );
}
