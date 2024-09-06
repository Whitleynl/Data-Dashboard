import { Line, Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

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

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

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

interface CandlestickChartData {
  series: {data: {x: string; y: number[]}[]}[];
    options: ApexOptions
}

const Dashboard = () => {
  // State to store data from API, with ChartData or null
  const [lineData, setLineData] = useState<ChartData | null>(null);
  const [barData, setBarData] = useState<ChartData | null>(null);
  const [pieData, setPieData] = useState<ChartData | null>(null);
  const [candlestickData, setCandlestickData] = useState<CandlestickChartData | null>(null);

  // Function to fetch data from Django API
  const fetchData = async () => {
    try {
      const lineResponse = await axios.get('http://localhost:8000/api/line-chart-data/');
      const barResponse = await axios.get('http://localhost:8000/api/bar-chart-data/');
      const pieResponse = await axios.get('http://localhost:8000/api/pie-chart-data/')
      const candlestickResponse = await axios.get('http://localhost:8000/api/candlestick-data/')
      
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
            borderColor:'rgba(75, 192, 192, 1)', 
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
    
      setCandlestickData({
        series: [
          {
            data: candlestickResponse.data.data.map((entry: any) => ({
              x: entry.x,
              y: [entry.open, entry.high, entry.low, entry.close],  
            }))
          },
        ],
        options: {
          chart: {
            type: 'candlestick',
          },
          xaxis: {
            categories: candlestickResponse.data.data.map((entry: any) => entry.x),
          },
        },
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

      <h2>Candlestick Chart</h2>
      {candlestickData ? (
        <ReactApexChart 
        options={candlestickData.options} 
        series={candlestickData.series} 
        type="candlestick" 
        height={350} 
      /> 
      ) : (
      <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;