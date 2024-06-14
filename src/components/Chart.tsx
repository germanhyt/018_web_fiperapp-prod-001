"use client";
import { Operation } from "@/core/layouts/domain";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  // Methods for the chart
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Análisis del Balance Mensual y Anual en Chart.js",
    },
  },
};

export const optionsDays = {
  // Methods for the chart
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Análisis del Balance diario en Chart.js",
    },
  },
};

const labels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const labelDaysInitial = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

interface IProps {
  operations: Operation[];
}

const Chart = ({ operations }: IProps) => {
  const [filteredIngresosData, setFilteredIngresosData] = useState<number[]>(
    []
  );
  const [filteredGastosData, setFilteredGastosData] = useState<number[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(4);
  const [selectedYear, setSelectedYear] = useState<number | null>(2024);

  const [filteredIngresosDataByday, setFilteredIngresosDataByday] = useState<
    number[]
  >([]);
  const [filteredGastosDataByday, setFilteredGastosDataByday] = useState<
    number[]
  >([]);
  const [labelDays, setLabelDays] = useState<string[]>(labelDaysInitial);

  useEffect(() => {
    const filterData = () => {
      let filteredIngresos = new Array(labels.length).fill(0);
      let filteredGastos = new Array(labels.length).fill(0);

      let filteredIngresosByday = new Array(labelDays.length).fill(0);
      let filteredGastosByday = new Array(labelDays.length).fill(0);

      operations.forEach((operation) => {
        if (operation.createdAt) {
          const dateTemp: Date = new Date(operation.createdAt);
          const date = new Date(dateTemp);
          const month = date.getMonth();
          const year = date.getFullYear();

          const day = date.getDay();

          if (
            (selectedMonth === null || month === selectedMonth) &&
            (selectedYear === null || year === selectedYear)
          ) {
            if (operation.operationtypeId === 1) {
              filteredIngresos[month] += operation.mount;
              // console.log("filtered1", filteredIngresos[month]);
              filteredIngresosByday[day] += operation.mount;
            } else {
              filteredGastos[month] += operation.mount;
              // console.log("filtered1", filteredGastos[month]);
              filteredGastosByday[day] += operation.mount;
            }
          }
        }
      });
      setFilteredIngresosData(filteredIngresos);
      setFilteredGastosData(filteredGastos);

      setFilteredIngresosDataByday(filteredIngresosByday);
      setFilteredGastosDataByday(filteredGastosByday);
    };

    if (operations.length > 0 && labelDays.length > 0) {
      filterData();
    }
  }, [operations, selectedMonth, selectedYear, labelDays]);

  useEffect(() => {
    if (selectedMonth !== null && selectedYear !== null) {
      const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
      setLabelDays(daysInMonth.map((day) => labelDaysInitial[day]));
    }
  }, [selectedMonth, selectedYear]);

  const getDaysInMonth = (month: number, year: number): number[] => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // console.log("TEST ", month, year, daysInMonth);
    const days: number[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push(date.getDay());
    }
    // console.log("days ---> ", days);
    return days;
  };

  return (
    <div className="grid grid-cols-1 gap-4 mx-auto pb-20">
      <div className="h-fit w-full sm:w-2/3 mx-auto ">
        <div className="flex flex-col gap-4">
          {/* // Filtros por mes y año */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center my-4">
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="month">Mes</label>
              <select
                id="month"
                value={
                  selectedMonth === null ? "All" : String(selectedMonth + 1)
                }
                onChange={(e) => {
                  if (e.target.value === "All") {
                    setSelectedMonth(null);
                  } else {
                    setSelectedMonth(Number(e.target.value) - 1);
                  }
                }}
                className="px-4 py-2 border shadow-lg border-green-800 rounded-lg"
              >
                <option value="All">All</option>
                {labels.map((label, index) => {
                  return (
                    <option key={index} value={String(index + 1)}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <label htmlFor="year">Año</label>
              <select
                id="year"
                value={selectedYear === null ? "All" : String(selectedYear)}
                onChange={(e) => {
                  if (e.target.value === "All") {
                    setSelectedYear(null);
                  } else {
                    setSelectedYear(Number(e.target.value));
                  }
                }}
                className="px-4 py-2 border shadow-lg border-green-800 rounded-lg"
              >
                <option value="All">All</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
            </div>
          </div>
        </div>

        <Bar
          options={options}
          data={{
            labels: labels,
            datasets: [
              {
                label: "Ingresos",
                data: filteredIngresosData,
                borderColor: "green",
                backgroundColor: "green",
              },
              {
                label: "Gastos",
                data: filteredGastosData,
                borderColor: "red",
                backgroundColor: "red",
              },
            ],
          }}
        />
      </div>
      <div className="h-screen w-full mx-auto ">
        <Bar
          options={optionsDays}
          data={{
            labels: labelDays,
            datasets: [
              {
                label: "Ingresos",
                data: filteredIngresosDataByday,
                borderColor: "green",
                backgroundColor: "green",
              },
              {
                label: "Gastos",
                data: filteredGastosDataByday,
                borderColor: "red",
                backgroundColor: "red",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Chart;

// export const data = {
//   labels,
//   datasets: [
//     {
//       labels: "Dataset 1",
//       data: [100, 200, 300, 400, 500, 600, 700],
//       borderColor: "green",
//       backgroundColor: "green",
//     },
//   ],
// };
