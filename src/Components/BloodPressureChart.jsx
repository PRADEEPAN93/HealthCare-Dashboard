import React, { useMemo, useState } from "react";
import { Chart } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale,
  LinearScale, PointElement,
  LineElement, Title,
  Tooltip, Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BloodPressureChart = ({ diagnosisHistory }) => {
  const [timeRange, setTimeRange] = useState("1");

  const handleSelectChange = (event) => {
    setTimeRange(event.target.value);
  };

  // Process data safely and efficiently
  const processedData = useMemo(() => {
    if (
      !diagnosisHistory ||
      !Array.isArray(diagnosisHistory) ||
      diagnosisHistory.length === 0
    )
      return null;

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Validate and clean data
    const validRecords = diagnosisHistory.filter((record) => {
      return (
        record?.month &&
        record?.year &&
        record?.blood_pressure?.systolic?.value !== undefined &&
        record?.blood_pressure?.diastolic?.value !== undefined
      );
    });

    if (validRecords.length === 0) return null;

    // Sort by date ascending
    const sorted = [...validRecords].sort((a, b) => {
      const aMonth = monthNames.indexOf(a.month);
      const bMonth = monthNames.indexOf(b.month);
      return new Date(a.year, aMonth, 1) - new Date(b.year, bMonth, 1);
    });

    const limited =
      timeRange === "1"
        ? sorted.slice(-12)
        : timeRange === "15"
        ? sorted.slice(-15)
        : sorted.slice(-24);

    const lastRecord = limited[limited.length - 1];

    return {
      labels: limited.map((r) => `${r.month.slice(0, 3)}, ${r.year}`),
      systolicData: limited.map((r) => r.blood_pressure.systolic.value),
      diastolicData: limited.map((r) => r.blood_pressure.diastolic.value),
      currentReadings: {
        systolic: lastRecord.blood_pressure.systolic,
        diastolic: lastRecord.blood_pressure.diastolic,
      },
    };
  }, [diagnosisHistory, timeRange]);

  if (!processedData) {
    return (
      <div className="bg-[#F8F5FF] p-4 rounded-lg flex items-center justify-center h-52">
        <p className="text-gray-500">No blood pressure data available</p>
      </div>
    );
  }

  // Chart.js configuration
  const chartData = {
    labels: processedData.labels,
    datasets: [
      {
        label: "Systolic",
        data: processedData.systolicData,
        borderColor: "#C26EB4",
        backgroundColor: "#C26EB4",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#E66FD2",
      },
      {
        label: "Diastolic",
        data: processedData.diastolicData,
        borderColor: "#7E6CAB",
        backgroundColor: "#7E6CAB",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#8C6FE6",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#FFF",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#DDD",
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        min: 60,
        max: 180,
        grid: { color: "#F0F0F0", drawBorder: false },
        ticks: {
          stepSize: 20,
          color: "#707070",
          font: { family: "Manrope", size: 12 },
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: "#707070",
          font: { family: "Manrope", size: 12 },
        },
      },
    },
  };

  return (
    <div className="bg-[#F8F5FF] p-4 rounded-lg">
      <div className="flex flex-wrap md:flex-nowrap">
        {/* Chart Section */}
        <div className="mb-6 w-full md:w-2/3">
          <div className="flex justify-between items-center pb-2">
            <h3 className="text-lg font-bold text-[#072635]">
              Blood Pressure
            </h3>
            <select
              className="bg-[#F8F5FF] rounded-lg px-3 py-1 text-sm border"
              value={timeRange}
              onChange={handleSelectChange}
            >
              <option value="1">Last 1 Year</option>
              <option value="15">Last 15 Months</option>
              <option value="2">Last 2 Years</option>
            </select>
          </div>
          <div className="h-52">
            <Chart type="line" data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Readings Section */}
        <div className="flex flex-col w-full md:w-1/3 pl-4">
          {/* Systolic */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#E66FD2] mr-2"></div>
              <span className="text-sm font-bold">Systolic</span>
            </div>
            <div className="text-2xl font-bold">
              {processedData.currentReadings.systolic.value}
            </div>
            <div className="text-sm flex items-center">
              {processedData.currentReadings.systolic.levels.includes("Higher")
                ? "▲"
                : "▼"}{" "}
              {processedData.currentReadings.systolic.levels}
            </div>
          </div>

          <hr className="border-[#E0E0E0] my-2" />

          {/* Diastolic */}
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#8C6FE6] mr-2"></div>
              <span className="text-sm font-bold">Diastolic</span>
            </div>
            <div className="text-2xl font-bold">
              {processedData.currentReadings.diastolic.value}
            </div>
            <div className="text-sm flex items-center">
              {processedData.currentReadings.diastolic.levels.includes("Higher")
                ? "▲"
                : "▼"}{" "}
              {processedData.currentReadings.diastolic.levels}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodPressureChart;
