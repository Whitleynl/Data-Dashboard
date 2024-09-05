import { Line, Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement, 
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement, 
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Define the structure of the chart data
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string[];
    fill?: boolean;
    borderWidth?: number;
  }[];
}

const Dashboard = () => {
  // State to store data fetched from the API, with ChartData type or null
  const [lineData, setLineData] = useState<ChartData | null>(null);
  const [barData, setBarData] = useState<ChartData | null>(null);
  const [pieData, setPieData] = useState<ChartData | null>(null);

  // Function to fetch data from Django API
  const fetchData = async () => {
    try {
      const lineResponse = await axios.get('http://localhost:8000/api/line/');
      const barResponse = await axios.get('http://localhost:8000/api/bar/');
      const pieResponse = await axios.get('http://localhost:8000/api/pie/');
      
      // Set the fetched data into state
      setLineData({
        labels: lineResponse.data.labels,
        datasets: [
          {
            label: 'Sales',
            data: lineResponse.data.data,
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
          },
        ],
      });

      setBarData({
        labels: barResponse.data.labels,
        datasets: [
          {
            label: '# of Votes',
            data: barResponse.data.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });

      setPieData({
        labels: pieResponse.data.labels,
        datasets: [
          {
            label: '# of Votes',
            data: pieResponse.data.data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard</h1>

      <h2>Line Chart</h2>
      {lineData ? <Line data={lineData} /> : <p>Loading...</p>}

      <h2>Bar Chart</h2>
      {barData ? <Bar data={barData} /> : <p>Loading...</p>}

      <h2>Pie Chart</h2>
      {pieData ? <Pie data={pieData} /> : <p>Loading...</p>}
    </div>
  );
};

export default Dashboard;