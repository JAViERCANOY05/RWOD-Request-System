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
import Student from "@/pages/api/getStudent";
import DeleteUser from "@/pages/api/deleteUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess } from "@/pages/Notifications";

interface Column {
  id: "id number" | "name" | "course" | "year" | "contact" | "email" | "action";
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
}

function createData(
  id_number: number,
  name: string,
  course: string,
  year: number,
  contact: number,
  email: string
): Data {
  return { id_number, name, course, year, contact, email };
}

const rows = [createData(2, "IN", "javier", 2, 4, "2ko")];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [studentList, setStudentList] = React.useState([]);
  const [userId, setUserId] = React.useState();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdate = () => {
    console.log("update");
    notifyError("Under Coding!");
  };
  const handleDeleteUser = async (id: any) => {
    try {
      const token = localStorage.getItem("token");
      const responseData = await DeleteUser.delete(id, token);
      if (responseData.status) {
        notifySuccess("User deleted!");
        GetStudentList();
        console.log("already deleted!");
      }
    } catch (error) {
      notifyError("Something went Wrong!");
      console.log("something went wrong!");
    }
  };

  const GetStudentList = async () => {
    try {
      const token = localStorage.getItem("token");
      const responseData = await Student.listOfStudent(token);
      if (responseData.status) {
        setStudentList(responseData.response);
        console.log(" data is here ");
      } else {
        console.log("some is wrong ! ");
      }
    } catch (error) {
      console.log("some is wrong ! ");
    }
  };

  React.useEffect(() => {
    GetStudentList();
  }, []);
  console.log(studentList, "ppp");
  return (
    <div className=" h-screen">
      <div className="my-10">
        <p className=" font-bold border-2 rounded-md p-5 bg-slate-400 text-white">
          Student List
        </p>
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
              {studentList.length === 0 ? (
                <TableCell align="center" colSpan={7}>
                  Loading...
                </TableCell>
              ) : (
                studentList
                  .filter((student: any) => student.role === "student") // Filter students with role "student"
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student: any, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index++}
                      >
                        <TableCell>{student._id}</TableCell>
                        <TableCell>{student.firstName}</TableCell>
                        <TableCell align="right">{student.course}</TableCell>
                        <TableCell align="right">{student.year}</TableCell>
                        <TableCell align="right">contact onGoing</TableCell>
                        <TableCell align="right">{student.email}</TableCell>
                        <TableCell align="right">
                          <div>
                            {/* <Link href="/components/registrar/Edit_Course"> */}
                            <button
                              onClick={handleUpdate}
                              type="button"
                              className="focus:outline-none font-bold text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                              Update
                            </button>
                            {/* </Link> */}
                            <button
                              onClick={() => handleDeleteUser(student._id)}
                              type="button"
                              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
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
      <ToastContainer />
    </div>
  );
}
