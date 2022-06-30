import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Number of Visits",
    },
  },
};

const Graph = () => {
  const data = {
    labels: [...Array(30).keys()],
    datasets: [
      {
        label: "Total Visits",
        data: [...Array(31).keys()],
      },
    ],
  };
  return (
    <div>
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <Sidebar />
        </div>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default Graph;
