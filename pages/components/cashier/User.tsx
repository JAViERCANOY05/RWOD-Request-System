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
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AddUser from "@/pages/api/addUser";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

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
  // {
  //   id: "action",
  //   label: "Action",
  //   minWidth: 170,
  //   align: "right",
  // },
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

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [studentList, setStudentList] = React.useState([]);
  const [userId, setUserId] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    firstName: "",
    lastName: "",
    year: "",
    course: "",
    email: "",
    password: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  const handleDeleteUser = async (list: any) => {
    console.log(list.role);
    if (list.role === "student") {
      try {
        const token = localStorage.getItem("token");
        const responseData = await DeleteUser.delete(list.id, token);
        if (responseData.status) {
          notifySuccess("User deleted!");
          GetStudentList();
          console.log("already deleted!");
        }
      } catch (error) {
        notifyError("Something went wrong!");
        console.log("something went wrong!");
      }
    } else {
      notifyError("This user can't be deleted!");
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

  const handleSubmitUser = async (e: any) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await AddUser.add(token, user);
      if (response.status) {
        handleClose();
        notifySuccess("Successfully Added");
        console.log("Successfully Added");
        GetStudentList();
        setUser({
          firstName: "",
          lastName: "",
          year: "",
          course: "",
          email: "",
          password: "",
        });
      } else {
        console.log("Something Went wrong");
      }
    } catch (error) {
      notifyError("Something Went wrong");
      console.log("Something Went wrong");
    }
  };

  const handleAddUserModal = (e: any) => {
    // e.preventDefault();
    handleOpen();
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  React.useEffect(() => {
    GetStudentList();
  }, []);
  console.log(studentList, "ppp");
  return (
    <div className=" h-screen">
      <div className="my-10">
        <p className=" font-bold border-2 rounded-md p-5 bg-slate-400 text-white">
          Users List
        </p>
      </div>
      {/* <button
        onClick={handleAddUserModal}
        type="button"
        className="focus:outline-none font-bold  my-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add User
      </button> */}

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
                  <CircularProgress />
                </TableCell>
              ) : (
                studentList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((list: any, index = 0) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index++}
                      >
                        <TableCell>{list._id}</TableCell>
                        <TableCell>{list.firstName}</TableCell>
                        <TableCell align="right">{list.course}</TableCell>
                        <TableCell align="right">{list.year}</TableCell>
                        <TableCell align="right">contact onGoing</TableCell>
                        <TableCell align="right">{list.email}</TableCell>
                        {/* <TableCell align="right">
                          <div>
                            <button
                              onClick={handleUpdate}
                              type="button"
                              className="focus:outline-none font-bold text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleDeleteUser(list)}
                              type="button"
                              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </TableCell> */}
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
          count={studentList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" flex justify-center">
            <p className="  bg-slate-400 rounded-md py-3 px-10 ">Add User</p>
          </div>
          <div className=" flex justify-center">
            {/* onSubmit={handleSubmitData} */}
            <div>
              <div className=" flex my-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6  py-3 mx-10"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    value={user.firstName}
                    onChange={handleChange}
                    id="firstName"
                    name="firstName"
                    type="firstName"
                    autoComplete="firstName"
                    required
                    className="block font-bold px-20 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className=" flex  my-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6  py-3 mx-10"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    value={user.lastName}
                    onChange={handleChange}
                    id="lastName"
                    name="lastName"
                    type="lastName"
                    autoComplete="lastName"
                    required
                    className="block font-bold px-20 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className=" flex  my-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6  py-3 pr-10 mx-10"
                >
                  Year
                </label>
                <div className="mt-2">
                  <input
                    value={user.year}
                    onChange={handleChange}
                    id="year"
                    name="year"
                    type="year"
                    autoComplete="year"
                    required
                    className="block font-bold px-20 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className=" flex  my-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6  py-3 pr-6 mx-10"
                >
                  Course
                </label>
                <div className="mt-2">
                  <select
                    value={user.course}
                    onChange={handleChange}
                    id="course"
                    name="course"
                    autoComplete="course"
                    required
                    className="block font-bold w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Choose a course</option>
                    <option value="course1">Course 1</option>
                    <option value="course2">Course 2</option>
                    <option value="course3">Course 3</option>
                  </select>
                </div>
              </div>

              <div className=" flex  my-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6  py-3 pr-9 mx-10"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    value={user.email}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block font-bold px-20 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className=" flex  my-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 pr-3  py-3 mx-10"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    value={user.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    className="block font-bold px-20 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className=" flex justify-end mt-5">
                <button
                  onClick={handleSubmitUser}
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
}
