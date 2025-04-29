import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import { Stock } from '../types/stock';
  
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  
  interface Props {
    stocks: Stock[];
  }
  
  const BarChart = ({ stocks }: Props) => {
    const chartData = {
      labels: stocks.map((s) => s.symbol),
      datasets: [
        {
          label: 'Stock Price ($)',
          data: stocks.map((s) => s.price),
          backgroundColor: 'rgba(59, 130, 246, 0.7)', // Tailwind blue-500
          borderRadius: 4,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  
    return (
      <div className="w-full md:w-2/3 mx-auto my-8 bg-white p-4 shadow rounded">
        <h2 className="text-xl font-bold text-center mb-4 text-blue-700">Stock Prices</h2>
        <Bar data={chartData} options={options} />
      </div>
    );
  };
  
  export default BarChart;
  