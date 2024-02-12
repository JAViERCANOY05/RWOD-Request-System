import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";

interface Column {
  id: "Complete Name" | "Designation" | "Email" | "Phone No" | "Status";

  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "Complete Name", label: "Complete Name", minWidth: 170 },
  { id: "Designation", label: "Designation", minWidth: 100 },
  {
    id: "Email",
    label: "Email",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Phone No",
    label: "Phone No",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 170,
    align: "right",
  },
];

interface Data {
  Complete_Name: string;
  Designation: string;
  Email: string;
  Phone_No: string;
  Status: string;
}

function createData(
  Complete_Name: string,
  Designation: string,
  Email: string,
  Phone_No: string,
  Status: string
): Data {
  return {
    Complete_Name,
    Designation,
    Email,
    Phone_No,
    Status,
  };
}

const rows = [
  createData("India", "IN", "2", "2", "23"),
  createData("India", "IN", "2", "2", "32"),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className=" h-screen">
      <div className="my-10">
        <p className=" font-bold border-2 rounded-md p-5 bg-slate-400 text-white">
          Registrar
        </p>
      </div>
      <div className=" flex justify-center">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 1500,
              height: "100%",
            },
          }}
        >
          {/* <Paper> */}
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index + 1}
                        >
                          <TableCell>{row.Complete_Name}</TableCell>
                          <TableCell>{row.Designation}</TableCell>
                          <TableCell align="right">{row.Email}</TableCell>
                          <TableCell align="right">{row.Phone_No}</TableCell>
                          <TableCell align="right">{row.Status}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          {/* </Paper> */}
        </Box>
      </div>
    </div>
  );
}
