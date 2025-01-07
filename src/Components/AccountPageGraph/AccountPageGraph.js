import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);


function AccountPageGraph({id}) {
    const labels = [0, 25, 50, 75, 100]; // X-axis labels
    const color = "#2e2b96";
    
    const data = {
            labels,
            datasets: (() => {
                const account = JSON.parse(localStorage.getItem(`${id}`));
              if (!account) {
                return [{
                  data: [0, 0, 0, 0, 0],
                  borderWidth: 5,
                  pointRadius: 6,
                  borderColor: color,
                  backgroundColor: color,
                  fill: false,
                }];
                }
                const views = account.video_views
                return [{
                    data: [100, (account.p25 / views) * 100,
                        (account.p50 / views) * 100,
                        (account.p75 / views) * 100,
                        (account.p100 / views) * 100],
                    borderWidth: 5,
                    pointRadius: 6,
                    borderColor: color,
                    backgroundColor: color,
                    fill: false,
                }];
            })()
        }

    const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: "WATCHED %",
          color: "#2e2b96",
          font: {
            family: 'Outfit',
            size: 28,
            weight: 600,
          },
          padding: 10,
          align: "end",
        },
        min: 0,
        max: 100,
        ticks: {
          padding: 10,
          stepSize: 25,
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
        max: 100,
        ticks: {
          padding: 10,
          stepSize: 10,
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
        text: "PEOPLE %",
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
        enabled: true,
      },
      },
  };

  return (
      <Line data={data} options={options} />
    
  );
};




export default AccountPageGraph;