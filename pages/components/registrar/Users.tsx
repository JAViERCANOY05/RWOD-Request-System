import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Link from "next/link";

interface Column {
  id:
    | "id number"
    | "name"
    | "course"
    | "year"
    | "contact"
    | "email"
    | "account"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id number", label: "ID No.", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "course",
    label: "Course",
    minWidth: 170,
    align: "right",
  },
  {
    id: "year",
    label: "Year",
    minWidth: 170,
    align: "right",
  },
  {
    id: "contact",
    label: "Contact",
    minWidth: 170,
    align: "right",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right",
  },
  {
    id: "account",
    label: "Account",
    minWidth: 170,
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
  },
];

interface Data {
  id_number: number;
  name: string;
  course: string;
  year: number;
  contact: number;
  email: string;
  account: number;
}

function createData(
  id_number: number,
  name: string,
  course: string,
  year: number,
  contact: number,
  email: string,
  account: number
): Data {
  return { id_number, name, course, year, contact, email, account };
}

const rows = [createData(2, "IN", "javier", 2, 4, "2ko", 5)];

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
  const handleDelete = () => {
    console.log("delete");
  };
  const handleUpdate = () => {
    console.log("update");
  };

  return (
    <div className=" h-screen">
      <div className="my-10">
        <p className=" font-bold border-2 rounded-md p-5">Registrar</p>
      </div>
      <Link href="/components/registrar/Add_Student">
        <button
          type="button"
          className="focus:outline-none font-bold  my-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add User
        </button>
      </Link>

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
                      <TableCell key={index + 1}>{row.id_number}</TableCell>
                      <TableCell key={index + 1}>{row.name}</TableCell>
                      <TableCell key={index + 1} align="right">
                        {row.course}
                      </TableCell>
                      <TableCell key={index + 1} align="right">
                        {row.year}
                      </TableCell>
                      <TableCell key={index + 1} align="right">
                        {row.contact}
                      </TableCell>
                      <TableCell key={index + 1} align="right">
                        {row.email}
                      </TableCell>
                      <TableCell key={index + 1} align="right">
                        {row.account}
                      </TableCell>

                      <TableCell key={index + 1} align="right">
                        <div>
                          <Link href="/components/registrar/Edit_Course">
                            <button
                              // onClick={handleUpdate}
                              type="button"
                              className="focus:outline-none font-bold   text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                              Update
                            </button>
                          </Link>
                          <button
                            onClick={handleDelete}
                            type="button"
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          >
                            Delete
                          </button>
                        </div>
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
    </div>
  );
}
