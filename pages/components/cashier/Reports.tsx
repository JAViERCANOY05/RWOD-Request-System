import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

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
              width: 1600,
              height: 700,
            },
          }}
        >
          <Paper elevation={3} />
        </Box>
      </div>
    </div>
  );
};

export default Reports;
