import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function ChartsOverviewDemo() {
  return (
    <div>
      <p className=" font-bold border-2 rounded-md p-5 my-10 text-black border-black">
        Reports
      </p>

      <BarChart
        series={[
          { data: [35, 44, 24, 34] },
          { data: [51, 6, 49, 30] },
          { data: [15, 25, 30, 50] },
          { data: [60, 50, 15, 25] },
          { data: [60, 50, 15, 25] },
          { data: [60, 50, 15, 100] },
        ]}
        height={290}
        xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </div>
  );
}
