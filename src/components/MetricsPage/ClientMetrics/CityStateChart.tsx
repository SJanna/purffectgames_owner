// pages/client-metrics.tsx
import { useEffect, useRef } from "react";
import Chart, { ChartTypeRegistry } from "chart.js/auto";
import { useGetClients } from "@/hooks/useGetClients";
import { ChartConfiguration } from "chart.js/auto";

type cityStateChartProps = {
  chartType: keyof ChartTypeRegistry;
};

const CityStateChart = ({chartType}:cityStateChartProps) => {
  const clients = useGetClients();
  const chartRefCityState = useRef(null);

  useEffect(() => {
    if (clients.length === 0) return;
    // Crear un gráfico para mostrar la distribución de los clientes por tipo ciudades / estado
    const citiesStates = clients.map((client) => {
      return `${client.city}, ${client.state}`;
    });

    const citiesStatesCounts: { [key: string]: number } = citiesStates.reduce(
      (acc, cityState) => {
        acc[cityState] = (acc[cityState] || 0) + 1;
        return acc;
      },
      {} as { [key: string]: number }
    );

    const dataCityState = {
      labels: Object.keys(citiesStatesCounts),
      datasets: [
        {
          label: "Distribución por ciudad y estado",
          data: Object.values(citiesStatesCounts),
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(255, 159, 64, 0.5)",
            "rgba(205, 92, 92, 0.5)",
            "rgba(0, 128, 128, 0.5)",
            "rgba(128, 0, 128, 0.5)",
            "rgba(0, 128, 0, 0.5)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(205, 92, 92, 1)",
            "rgba(0, 128, 128, 1)",
            "rgba(128, 0, 128, 1)",
            "rgba(0, 128, 0, 1)"
          ],
          borderWidth: 1,
        },
      ],
    };

    const ctxCityState = (
      chartRefCityState.current as HTMLCanvasElement | null
    )?.getContext("2d");
    if (!ctxCityState) return;


    const configCityState: ChartConfiguration<typeof chartType, number[], string> = {
      type: chartType,
      data: dataCityState,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const myChartCityState = new Chart(ctxCityState, configCityState);

    // Limpieza al desmontar el componente
    return () => {
      myChartCityState.destroy();
    };
  }, [clients, chartType]);

  return <canvas ref={chartRefCityState}></canvas>;
};

export default CityStateChart;
