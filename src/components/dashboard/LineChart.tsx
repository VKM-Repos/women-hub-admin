import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function LineChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Discussion",
        data: [40, 31, 33, 25, 60, 10, 80],
        borderColor: "#FF7400",
        cubicInterpolationMode: "monotone",
        pointStyle: "circle",
        borderWidth: 2,
        backgroundColor: "#FF7400",
        fontWeight: 600,
        stepped: false,
        tension: 1,
      },
      {
        label: "Organization likes",
        data: [2, 28, 53, 24, 33, 19, 40],
        borderColor: "#65B891",
        cubicInterpolationMode: "monotone",
        pointStyle: "circle",
        borderWidth: 2,
        backgroundColor: "#65B891",
        stepped: false,
        tension: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          padding: 24,
          boxWidth: 14,
          font: {
            weight: 700,
          },
        }
        }
      }
    }
  
  return (
    <div className="px-5 py-5 w-full h-full">
      <Line data={data as ChartData<"line">} options={options} />
    </div>
  );
}
