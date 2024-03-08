import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { CChart } from "@coreui/react-chartjs";

const Reports = () => {
  return (
    <div className="  h-screen">
      <div>
        <p className=" border-2 p-5 rounded-md font-bold bg-slate-400 text-white ">
          Reports
        </p>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 1800,
              height: 700,
            },
          }}
        >
          <Paper elevation={3}>
            <div className=" m-5">
              <p>Report :</p>
            </div>
            <div className=" flex justify-center">
              <div className="h-96 w-96">
                <CChart
                  type="doughnut"
                  data={{
                    labels: ["TOR", "COR" , "COG" , "CAV" ,"COE" ,"GOOD MORAL" ,""],
                    datasets: [
                      {
                        backgroundColor: [
                          "#41B883",
                          "#E46651",
                          "#00D8FF",
                          "#DD1B16",
                        ],
                        data: [40, 20,10, 5,40, 30],
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: "#090D13",
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default Reports;
