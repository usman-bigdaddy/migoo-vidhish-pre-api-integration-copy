import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '../../../components/shared/DashboardCard';

const ScoresGraph = () => {
  const theme = useTheme();
  const [state, setState] = React.useState({
        series: [
            {
              name: 'Sentence',
              color: "#8382de",
              data: [72, 85, 60, 78, 66, 90, 81],
            },
            {
              name: 'Restatements',
              color: "#56c3d5",
              data: [30, 50, 10, 63, 40, 30, 53],
            },
            {
              name: 'Reading',
              color: "#f6a343",
              data: [30, 10, 23, 8, 22, 38, 43],
            },
          ],
    options: {
        chart: {
          height: 350,
          type: 'area'
        },
        // dataLabels: {
        //   enabled: true,
        //   style: {
        //     colors: ['#000']
        //   }
        // },
        stroke: {
          curve: 'smooth'
        },
        yaxis: {
          min: 0,
          max: 100,
          title: {
            text: 'Accuracy (%)'
          },
          labels: {
            formatter: function (val) {
              return val + "%";
            }
          }
        },
        xaxis: {
          type: 'datetime',
          categories: [
            "2025-04-16T00:00:00.000Z",
            "2025-04-16T01:00:00.000Z",
            "2025-04-16T02:00:00.000Z",
            "2025-04-16T03:00:00.000Z",
            "2025-04-16T04:00:00.000Z",
            "2025-04-16T05:00:00.000Z",
            "2025-04-16T06:00:00.000Z"
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
          y: {
            formatter: function (val) {
              return val + "% Accuracy";
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'center'
        }
      },
});

  return (
    <DashboardCard
      title="Scores Static"
    >
      <>
      <Chart 
      options={state.options} 
      series={state.series} 
      type="area" 
       />
      </>
    </DashboardCard>
  );
};

export default ScoresGraph;
