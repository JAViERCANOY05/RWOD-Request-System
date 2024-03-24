import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { CChart } from "@coreui/react-chartjs";
import Status from "./../../api/getAllStatatus";

const Reports = () => {
  const [data, setData] = React.useState({
    approve: "",
    pending: "",
    totalAmount: "",
  });

  const getStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await Status.update(token);

      if (response.status) {
        setData(response.response);
        console.log(response.response, " kk");
      } else {
        console.log(" error");
      }
    } catch (error) {
      console.log(" error");
    }
  };
  return (
    <div className="h-screen flex justify-center ">
      <div className=" w-11/12 flex">
        <div className="flex-grow">
          <p className="border-2 p-5 rounded-md font-bold bg-slate-400 text-white text-center">
            Reports
          </p>
          <Box sx={{ mt: 2 }}>
            <Paper elevation={3}>
              <div className="p-5">
                <p className="font-semibold">Report:</p>
              </div>
              <div className="flex justify-center">
                <div className=" w-1/2">
                  <CChart
                    type="doughnut"
                    data={{
                      labels: [
                        "TOR",
                        "COR",
                        "COG",
                        "CAV",
                        "COE",
                        "GOOD MORAL",
                        "",
                      ],
                      datasets: [
                        {
                          backgroundColor: [
                            "#41B883",
                            "#E46651",
                            "#00D8FF",
                            "#DD1B16",
                          ],
                          data: [40, 20, 10, 5, 40, 30],
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
    </div>
  );
};

export default Reports;
