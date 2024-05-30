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
        borderWidth: 4,
        backgroundColor: "#FF7400",
      },
      {
        label: "Organization likes",
        data: [2, 28, 53, 24, 33, 19, 40],
        borderColor: "#65B891",
        cubicInterpolationMode: "monotone",
        pointStyle: "circle",
        borderWidth: 4,
        backgroundColor: "#65B891",
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
    },
  };
  return (
    <div className="px-5 pt-5">
      <Line data={data} options={options} suggestedMax={200} />
    </div>
  );
}
