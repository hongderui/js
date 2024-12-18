import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import { Pie, Bar, Scatter, Line } from "react-chartjs-2";
import Plot from "react-plotly.js";
import Papa from "papaparse";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
);

interface DiabetesData {
  Pregnancies: number;
  Glucose: number;
  BloodPressure: number;
  SkinThickness: number;
  Insulin: number;
  BMI: number;
  DiabetesPedigreeFunction: number;
  Age: number;
  Outcome: number;
}

const DiabetesCharts: React.FC = () => {
  const [data, setData] = useState<DiabetesData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/diabetes.csv");
      const csvText = await response.text();
      const result = Papa.parse(csvText, { header: true });

      const parsedData = result.data.map((row) => ({
        ...row,
        Glucose: Number(row.Glucose),
        BMI: Number(row.BMI),
        Age: Number(row.Age),
        Outcome: Number(row.Outcome),
      }));

      setData(parsedData);
    };

    fetchData();
  }, []);
  // 饼图选项
  const pieChartData = {
    labels: ["Non-Diabetic", "Diabetic"],
    datasets: [
      {
        label: "Patient Distribution",
        data: [
          data.filter((d) => d.Outcome === 0).length,
          data.filter((d) => d.Outcome === 1).length,
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  // 散点图选项
  const scatterChartData = {
    datasets: [
      {
        label: "Non-Diabetic",
        data: data
          .filter((d) => d.Outcome === 0)
          .map((d) => ({ x: d.Age, y: d.Glucose })),
        backgroundColor: "blue",
        pointStyle: "circle",
      },
      {
        label: "Diabetic",
        data: data
          .filter((d) => d.Outcome === 1)
          .map((d) => ({ x: d.Age, y: d.Glucose })),
        backgroundColor: "red",
        pointStyle: "triangle",
      },
    ],
  };

  // BMI分布图
  const bmiChartData = {
    labels: Array.from({ length: 10 }, (_, i) => `${i * 5}-${(i + 1) * 5}`),
    datasets: [
      {
        label: "Non-Diabetic",
        data: Array.from(
          { length: 10 },
          (_, i) =>
            data.filter(
              (d) => d.Outcome === 0 && d.BMI >= i * 5 && d.BMI < (i + 1) * 5,
            ).length,
        ),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "blue",
      },
      {
        label: "Diabetic",
        data: Array.from(
          { length: 10 },
          (_, i) =>
            data.filter(
              (d) => d.Outcome === 1 && d.BMI >= i * 5 && d.BMI < (i + 1) * 5,
            ).length,
        ),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "red",
      },
    ],
  };

  // 血压和胰岛素图
  const lineChartData = {
    labels: data.map((_, index) => index),
    datasets: [
      {
        label: "Insulin Non-Diabetic",
        data: data.filter((d) => d.Outcome === 0).map((d) => d.Insulin),
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.1)",
      },
      {
        label: "Insulin Diabetic",
        data: data.filter((d) => d.Outcome === 1).map((d) => d.Insulin),
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
      },
      {
        label: "Blood Pressure Non-Diabetic",
        data: data.filter((d) => d.Outcome === 0).map((d) => d.BloodPressure),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
      },
      {
        label: "Blood Pressure Diabetic",
        data: data.filter((d) => d.Outcome === 1).map((d) => d.BloodPressure),
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.1)",
      },
    ],
  };

  // 遗传函数分布图
  const pedigreeChartData = {
    labels: Array.from(
      { length: 10 },
      (_, i) => `${(i / 10).toFixed(1)}-${((i + 1) / 10).toFixed(1)}`,
    ),
    datasets: [
      {
        label: "Non-Diabetic",
        data: Array.from(
          { length: 10 },
          (_, i) =>
            data.filter(
              (d) =>
                d.Outcome === 0 &&
                d.DiabetesPedigreeFunction >= i / 10 &&
                d.DiabetesPedigreeFunction < (i + 1) / 10,
            ).length,
        ),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "blue",
      },
      {
        label: "Diabetic",
        data: Array.from(
          { length: 10 },
          (_, i) =>
            data.filter(
              (d) =>
                d.Outcome === 1 &&
                d.DiabetesPedigreeFunction >= i / 10 &&
                d.DiabetesPedigreeFunction < (i + 1) / 10,
            ).length,
        ),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "red",
      },
    ],
  };

  // 3D散点图
  const threeDScatterPlotData = [
    {
      x: data.filter((d) => d.Outcome === 0).map((d) => d.Glucose),
      y: data.filter((d) => d.Outcome === 0).map((d) => d.BMI),
      z: data.filter((d) => d.Outcome === 0).map((d) => d.Age),
      mode: "markers",
      type: "scatter3d",
      name: "Non-Diabetic",
      marker: {
        color: "blue",
        size: 3,
      },
    },
    {
      x: data.filter((d) => d.Outcome === 1).map((d) => d.Glucose),
      y: data.filter((d) => d.Outcome === 1).map((d) => d.BMI),
      z: data.filter((d) => d.Outcome === 1).map((d) => d.Age),
      mode: "markers",
      type: "scatter3d",
      name: "Diabetic",
      marker: {
        color: "red",
        size: 3,
      },
    },
  ];

  return (
    <div
      style={
        {
          /* 现有样式 */
        }
      }
    >
      <h1>Diabetes Data Visualization</h1>

      <div
        style={
          {
            /* 现有网格布局 */
          }
        }
      >
        {/* 饼图 */}
        <div
          style={
            {
              /* 现有样式 */
            }
          }
        >
          <h2>Patient Distribution</h2>
          <Pie
            data={pieChartData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
        </div>

        {/* 散点图 */}
        <div
          style={
            {
              /* 现有样式 */
            }
          }
        >
          <h2>Age and Glucose Correlation</h2>
          <Scatter
            data={scatterChartData}
            options={{
              responsive: true,
              scales: {
                x: { title: { display: true, text: "Age" } },
                y: { title: { display: true, text: "Glucose Level" } },
              },
            }}
          />
        </div>

        {/* BMI分布 */}
        <div
          style={
            {
              /* 现有样式 */
            }
          }
        >
          <h2>BMI Distribution Analysis</h2>
          <Bar
            data={bmiChartData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: "Number of Patients" },
                },
                x: {
                  title: { display: true, text: "BMI Range" },
                },
              },
            }}
          />
        </div>

        {/* 血压和胰岛素 */}
        <div
          style={
            {
              /* 现有样式 */
            }
          }
        >
          <h2>Insulin and Blood Pressure Trends</h2>
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              scales: {
                y: {
                  title: { display: true, text: "Value" },
                },
              },
            }}
          />
        </div>

        {/* 遗传函数 */}
        <div
          style={
            {
              /* 现有样式 */
            }
          }
        >
          <h2>Diabetes Pedigree Function</h2>
          <Bar
            data={pedigreeChartData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: "Number of Patients" },
                },
              },
            }}
          />
        </div>
      </div>

      {/* 3D图 */}
      <div
        style={
          {
            /* 现有样式 */
          }
        }
      >
        <h2>Multidimensional Risk Analysis</h2>
        <Plot
          data={threeDScatterPlotData}
          layout={{
            width: "100%",
            height: "500px",
            title: "Glucose, BMI, and Age Relationship",
          }}
        />
      </div>
    </div>
  );
};

export default DiabetesCharts;
