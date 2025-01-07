import { Bar } from 'react-chartjs-2'; // Import the Bar chart component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RoasGraph({ids}) {
    
    const data = {
        labels: ids.map((id) => {
            const account = JSON.parse(localStorage.getItem(`${id}`));
            return account.account_name;
        }),
        
        datasets: [{
            label: 'Roas',
            data: ids.map((id) => {
                const account = JSON.parse(localStorage.getItem(`${id}`));
                return account.roas;
            }),
          backgroundColor: '#FFA538',
          borderRadius: 35,
          maxBarThickness: 87,
            borderColor: '#FFA538',
            borderWidth: 0,
        }],
    };

    const options = {
        responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            padding: 10,
            font: {
              family: 'Mulish',
              size: 25,
              weight: 500,
            },
          },
          border: {
            width: 5.26,
            color: "#2e2b96",
            z: 1,
          },
          
        },
        y: {
          min: 0,
          ticks: {
            padding: 10,
            stepSize: 1,
            font: {
              family: 'Mulish',
              size: 25,
              weight: 500,
            },
          },
          border: {
            width: 5.26,
            color: "#2e2b96",
          },
        },
        
      },
      plugins: {
        title: {
          display: true,
          text: "ROAS",
          color: "#2e2b96",
          font: {
            family: 'Outfit',
            size: 28,
            weight: 600,
          },
          padding: {
            bottom: 40,
          },
          align: "start",
        },
        legend: {
            display: false,
          },
          tooltip: {
            enabled: true, // Enable tooltips for interactivity
            },
        },

  };

  return (
      <Bar data={data} options={options} />
    
  );
};




export default RoasGraph;