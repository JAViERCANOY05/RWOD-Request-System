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
  id:
    | "Control Number"
    | "User ID No"
    | "Name"
    | "Course"
    | "Are you the Owner"
    | "Relationship of Owner"
    | "No of Copy"
    | "Total Amount"
    | "Date Request"
    | "Date Payment"
    | "Reference"
    | "Proof of Payment"
    | "Date Releasing"
    | "Processing Officer"
    | "Status";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "Control Number", label: "Control Number", minWidth: 170 },
  { id: "User ID No", label: "User ID No", minWidth: 100 },
  {
    id: "Name",
    label: "Name",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Course",
    label: "Course",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Are you the Owner",
    label: "Are you the Owner",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Relationship of Owner",
    label: "Relationship of Owner",
    minWidth: 170,
    align: "right",
  },
  {
    id: "No of Copy",
    label: "No of Copy",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Total Amount",
    label: "Total Amount",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Date Request",
    label: "Date Request",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Date Payment",
    label: "Date Payment",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Reference",
    label: "Reference",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Proof of Payment",
    label: "Proof of Payment",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Date Releasing",
    label: "Date Releasing",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Processing Officer",
    label: "Processing Officer",
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
  Control_Number: string;
  User_ID_No: string;
  Name: string;
  Course: string;
  Are_you_the_Owner: string;
  Relationship_of_Owner: string;
  No_of_Copy: string;
  Total_Amount: string;
  Date_Request: string;
  Date_Payment: string;
  Reference: string;
  Proof_of_Payment: string;
  Date_Releasing: string;
  Processing_Officer: string;
  Status: string;
}

function createData(
  Control_Number: string,
  User_ID_No: string,
  Name: string,
  Course: string,
  Are_you_the_Owner: string,
  Relationship_of_Owner: string,
  No_of_Copy: string,
  Total_Amount: string,
  Date_Request: string,
  Date_Payment: string,
  Reference: string,
  Proof_of_Payment: string,
  Date_Releasing: string,
  Processing_Officer: string,
  Status: string
): Data {
  return {
    Control_Number,
    User_ID_No,
    Name,
    Course,
    Are_you_the_Owner,
    Relationship_of_Owner,
    No_of_Copy,
    Total_Amount,
    Date_Request,
    Date_Payment,
    Reference,
    Proof_of_Payment,
    Date_Releasing,
    Processing_Officer,
    Status,
  };
}

const rows = [
  createData(
    "India",
    "IN",
    "2",
    "2",
    "India",
    "IN",
    "2",
    "2",
    "India",
    "IN",
    "2",
    "2",
    "2",
    "2",
    "22"
  ),
  createData(
    "India",
    "IN",
    "2",
    "2",
    "India",
    "IN",
    "2",
    "2",
    "India",
    "IN",
    "2",
    "2",
    "2",
    "2",
    "22"
  ),
  createData(
    "India",
    "IN",
    "2",
    "2",
    "India",
    "IN",
    "2",
    "2",
    "India",
    "IN",
    "2",
    "2",
    "2",
    "2",
    "22"
  ),
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
    <div>
      <div className="my-10">
        <p className=" font-bold border-2 rounded-md p-5 bg-slate-400 text-white">
          Payment Information
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
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.Are_you_the_Owner}
                        >
                          <TableCell>{row.Control_Number}</TableCell>
                          <TableCell>{row.Course}</TableCell>
                          <TableCell align="right">
                            {row.Date_Payment}
                          </TableCell>
                          <TableCell align="right">
                            {row.Date_Releasing}
                          </TableCell>
                          <TableCell align="right">
                            {row.Date_Request}
                          </TableCell>
                          <TableCell align="right">
                            {row.Date_Request}
                          </TableCell>
                          <TableCell align="right">
                            {row.Date_Request}
                          </TableCell>
                          <TableCell align="right">
                            {row.Date_Request}
                          </TableCell>
                          <TableCell align="right">
                            {row.Date_Request}
                          </TableCell>
                          <TableCell align="right">
                            {row.Date_Request}
                          </TableCell>
                          <TableCell align="right">
                            {row.Date_Request}
                          </TableCell>
                          <TableCell align="right">
                            {row.Date_Request}
                          </TableCell>
                          <TableCell align="right">
                            {row.Date_Request}
                          </TableCell>
                          <TableCell align="right">
                            {row.Date_Request}
                          </TableCell>
                          <TableCell align="right">
                            {row.Date_Request}
                          </TableCell>
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
