import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function SimplePaper() {
  return (
    <div className=" flex justify-center">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 1500,
            height: 800,
          },
        }}
      >
        <Paper elevation={3} />
      </Box>
    </div>
  );
}
