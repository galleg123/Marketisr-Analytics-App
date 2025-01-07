import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);


function TimeGraph({ids}) {
    const labels = [0, 25, 50, 75, 100]; // X-axis labels
    const borderColors = ["red", "blue", "green"];
    const backgroundColors = ["red", "blue", "green"]
    
    const data = {
            labels,
            datasets: ids.map((id, index) => {
                const account = JSON.parse(localStorage.getItem(`${id}`));
                const views = account.video_views
                return {
                    label: account.account_name,
                    data: [100, (account.p25 / views) * 100,
                        (account.p50 / views) * 100,
                        (account.p75 / views) * 100,
                    (account.p100 / views) * 100],
                  borderWidth: 5,
                    pointRadius: 6,
                    borderColor: borderColors[index],
                    backgroundColor: backgroundColors[index],
                    fill: false,
                }
            })
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
        display: true,
        position: "right",
        align: "start",
        maxWidth: 350,
        labels: {
          boxWidth: 70,
          boxHeight: 21,
          useBorderRadius: true,
          borderRadius: 10,
          padding: 30,
          font: {
            family: 'Mulish',
            size: 24,
            weight: 500,
          }
        }
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




export default TimeGraph;