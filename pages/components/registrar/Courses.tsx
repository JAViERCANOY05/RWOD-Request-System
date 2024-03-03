import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import GetCourse from "@/pages/api/getCourse";
import DeleteCourse from "@/pages/api/deleteCourse";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import AddCourse from "@/pages/api/addCourse";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyError, notifySuccess } from "@/pages/Notifications";
import UpdateCourse from "@/pages/api/updateCourse";
import CircularProgress from "@mui/material/CircularProgress";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

interface Column {
  id: "name" | "description" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Course", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 100 },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [course, setCourse] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const [addCourse, setAddCourse] = React.useState({
    course: "",
    discription: "",
  });

  const [addCourseUpdate, setAddCourseUpdate] = React.useState({
    id: "",
    name: "",
    description: "",
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAddCourse((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeUpdate = (e: any) => {
    const { name, value } = e.target;
    setAddCourseUpdate((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getCourseList = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await GetCourse.get(token);
      if (res.status) {
        console.log(res.response);
        setCourse(res.response);
      }
    } catch (error) {
      console.log(error, "Error");
    }
  };
  const handleUpdate = (data: any) => {
    console.log(data);
    setAddCourseUpdate(data);
    handleOpenUpdate();
  };

  const handleDeleteCourse = async (couseID: any) => {
    try {
      const token = localStorage.getItem("token");
      const responseData = await DeleteCourse.delete(token, couseID);
      if (responseData.status) {
        notifySuccess("Successfully Deleted!");
        getCourseList();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong!");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      name: addCourse.course,
      description: addCourse.discription,
    };
    try {
      const token = localStorage.getItem("token");
      const res = await AddCourse.add(token, data);
      if (res.status) {
        getCourseList();
        notifySuccess("Successfully Added!");
        setOpen(false);
      }
    } catch (error) {
      notifyError("Something went wrong!");
      console.log(error);
    }

    setAddCourse({
      course: "",
      discription: "",
    });
  };

  const handlerSubmitUpdateCourse = async (e: any) => {
    e.preventDefault();
    const data = {
      name: addCourseUpdate.name,
      description: addCourseUpdate.description,
    };
    console.log(data, "123");

    try {
      const token = localStorage.getItem("token");
      const response = await UpdateCourse.update(
        token,
        data,
        addCourseUpdate.id
      );
      if (response.status) {
        getCourseList();
        handleCloseUpdate();
        notifySuccess("Course Updated!");
      } else {
        notifyError("Something went wrong!");
      }
    } catch (error) {
      notifyError("Something went wrong!");
      console.log("err");
    }
  };

  React.useEffect(() => {
    getCourseList();
  }, []);

  return (
    <div className=" h-screen">
      <div className="my-10">
        <p className=" font-bold border-2 rounded-md p-5 bg-slate-400 text-white">
          Courses
        </p>
      </div>
      <button
        onClick={handleOpen}
        type="button"
        className="focus:outline-none font-bold  my-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add Course
      </button>

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
              {course.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                      <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                course
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((course: any, index = 0) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index++}
                      >
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.description}</TableCell>
                        <TableCell align="right">
                          <div>
                            <button
                              onClick={() => {
                                handleUpdate(course);
                              }}
                              type="button"
                              className="focus:outline-none font-bold   text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
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
          count={course.length}
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
          <div className=" flex justify-center rounded-md bg-slate-400 py-3 mb-3">
            <h2>Add Course</h2>
          </div>
          <div>
            <label
              htmlFor="course"
              className="block text-sm font-medium leading-6 "
            >
              Course
            </label>
            <div className="mt-2">
              <input
                value={addCourse.course}
                onChange={handleChange}
                id="course"
                name="course"
                autoComplete="course"
                required
                className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="discription"
              className="block text-sm font-medium leading-6 "
            >
              Discription
            </label>
            <div className="mt-2">
              <input
                value={addCourse.discription}
                onChange={handleChange}
                id="discription"
                name="discription"
                autoComplete="discription"
                required
                className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className=" flex justify-end mt-3">
            <button
              onClick={handleClose}
              type="button"
              className="focus:outline-none font-bold  my-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              type="button"
              className="focus:outline-none font-bold  my-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" flex justify-center rounded-md bg-green-400 py-3 mb-3 text-white">
            <h2>Update Course</h2>
          </div>
          <div>
            <label
              htmlFor="course"
              className="block text-sm font-medium leading-6 "
            >
              Course
            </label>
            <div className="mt-2">
              <input
                // value={addCourse.course}
                defaultValue={addCourseUpdate.name}
                onChange={handleChangeUpdate}
                id="name"
                name="name"
                autoComplete="name"
                required
                className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="discription"
              className="block text-sm font-medium leading-6 "
            >
              Discription
            </label>
            <div className="mt-2">
              <input
                defaultValue={addCourseUpdate.description}
                // value={addCourse.discription}
                onChange={handleChangeUpdate}
                id="description"
                name="description"
                autoComplete="description"
                required
                className="block font-bold px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className=" flex justify-end mt-3">
            <button
              onClick={handleCloseUpdate}
              type="button"
              className="focus:outline-none font-bold  my-3 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Cancel
            </button>

            <button
              onClick={handlerSubmitUpdateCourse}
              type="button"
              className="focus:outline-none font-bold  my-3 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
}
