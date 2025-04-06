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
import { useGET } from "@/hooks/useGET.hook";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Period = {
  period: string,
}

export default function LineChart({ period }: Period) {
  
  const { data: user_engagement } = useGET({
    url: `admin/stats/user-engagement?period=${period}`,
    queryKey: [`${period}_ENGAGEMENT_STATISTICS`],
  });

  const discussionData = user_engagement?.map((entry: any) => entry?.discussion);
  const likesData = user_engagement?.map((entry: any) => entry?.organizationLikes);


  const data = {
    labels: period === 'WEEKLY' ? 
      ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"] : 
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: "Discussion",
        data: discussionData,
        borderColor: "#FF7400",
        backgroundColor: "#FF7400",
        cubicInterpolationMode: "monotone",
        pointStyle: "circle",
        borderWidth: 2,
        tension: 1,
      },
      {
        label: "Organization likes",
        data: likesData,
        borderColor: "#65B891",
        backgroundColor: "#65B891",
        cubicInterpolationMode: "monotone",
        pointStyle: "circle",
        borderWidth: 2,
        tension: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      y: {
        min: 0,
      },
      x: {
        min: 0,
      }
    }
  }

  
  return (
    <div className="p-4">
      <Line data={data as ChartData<"line">} options={options} />
    </div>
  );
}
