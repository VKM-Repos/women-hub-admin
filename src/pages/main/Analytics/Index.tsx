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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* LEFT: Top Cards */}
   
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="bg-green-100 p-4 rounded-lg flex justify-between items-center h-[131px]">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <h2 className="text-2xl font-semibold">180</h2>
            </div>
            <div className="bg-white p-3 rounded-full">👤</div>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg flex justify-between items-center h-[131px]">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <h2 className="text-2xl font-semibold">80</h2>
            </div>
            <div className="bg-white p-3 rounded-full">👤</div>
          </div>

          <div className="bg-gray-200 p-4 rounded-lg flex justify-between items-center h-[131px] mt-[-560px]">
            <div>
              <p className="text-sm text-gray-600">Organizations</p>
              <h2 className="text-2xl font-semibold">160</h2>
            </div>
            <div className="bg-white p-3 rounded-full">🏢</div>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg flex justify-between items-center h-[131px] mt-[-560px]">
            <div>
              <p className="text-sm text-gray-600">Active Organizations</p>
              <h2 className="text-2xl font-semibold">16</h2>
            </div>
            <div className="bg-white p-3 rounded-full">🏢</div>
          </div>

        </div>

        

        {/* RIGHT: Pie Chart */}

        <div className="lg:col-span-1">
          <ChartPieDonut />

          <div className="border w-100% h-[295px] mt-[30px] bg-[#fff] p-[30px] rounded-lg shadow">
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

          <div className="mt-6">
            <ChartPieDonutTwo />
          </div>

        </div>
      </div>

      {/* Charts Section */}
      <div className="w-[690px] h-[325px] grid grid-cols-1 gap-6 mt-[-1000px]">
        <ChartLineDefault />
        <ChartBarMultiple />
          <ChartLineMultiple />
      </div>

    </div>
  );
}
