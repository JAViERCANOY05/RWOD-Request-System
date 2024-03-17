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
import { useForm, SubmitHandler } from "react-hook-form";
import { notifyError, notifySuccess } from "@/pages/Notifications";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListRequest from "@/pages/api/list_requestSelf";
import { useEffect } from "react";
import Modal from "@mui/material/Modal";
import { eventNames } from "process";
import RequestForm from "@/pages/api/request_form";
import DeleteRequest from "@/pages/api/deleteRequest";
import UpdateRequest from "@/pages/api/updaRequest";

type Inputs = {
  controlNumber: string;
  studentId: string;
  emailAddress: string;
  isOwner: string;
  documentationType: string;
  noOfCopies: string;
  dateRequest: string;
  name: string;
  purpose: string;
  year: string;
  course: string;
  address: string;

  // relationshipToOwnwer: string;
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

interface Column {
  id:
    | "Control Number"
    | "User ID No"
    | "Name"
    | "Year"
    | "Course"
    | "Course"
    | "Are you the Owner"
    | "Relationship of Owner"
    | "Document Name"
    | "No of Copy"
    | "Date Request"
    | "Status"
    | "Action";

  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "Control Number", label: "Control Number", minWidth: 170 },
  { id: "Name", label: "Name", minWidth: 100 },
  { id: "Year", label: "Year", minWidth: 100 },
  { id: "Course", label: "Course", minWidth: 100 },
  { id: "User ID No", label: "User ID No", minWidth: 100 },
 
  {
    id: "Are you the Owner",
    label: "Are you the Owner",
    minWidth: 170,
    align: "right",
  },

  {
    id: "Document Name",
    label: "Document Name",
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
    id: "Date Request",
    label: "Date Request",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 170,
    align: "right",
  },
  // documentationType
];


export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [listRequest, setListRequest] = React.useState([]);
  const [dataRequest, setDataRequest] = React.useState({
    name : "",
    year : "",
    course : "",
    address :"",

    _id: "",
    controlNumber: "",
    studentId: "",
    isOwner: "",
    documentationType: "",
    noOfCopies: "",
    emailAddress: "",
    purpose: "",
  });

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [open, setOpen] = React.useState(false);
  const handleOpen = (event: any) => {
    event.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleOpenUpdate = (event: any) => {
    event.preventDefault();
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    reset();
    setOpenUpdate(false);
  };
  const handleDelete = async (id: any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await DeleteRequest.delete(token, id);
      if (response.status) {
        getListOfRequest();
        notifySuccess("Seccessfully Deleted!");
      } else {
        notifyError("Something went wrong!");
      }
    } catch (error) {
      notifyError("Something went wrong!");
    }
  };
  const onSubmit: SubmitHandler<Inputs> = async (data: any, event: any) => {
    event.preventDefault();
    const dataRequest = {
      controlNumber: data.controlNumber,
      studentId: data.studentId,
      emailAddress: data.emailAddress,
      isOwner: data.isOwner,
      documentationType: data.documentationType,
      noOfCopies: data.noOfCopies,
      purpose: data.purpose,
      name : data.name,
      year : data.year ,
      course : data.course,
      address : data.address
    };
    console.log(dataRequest, "data Submited !");
    try {
      const token = localStorage.getItem("token");
      const data = await RequestForm.request(dataRequest, token);
      if (data.status) {
        notifySuccess("Add succesfully");
        getListOfRequest();
        reset();
        setOpen(false);
      } else {
        notifyError("Something went wrong ! ");
        console.log("error ");
      }
    } catch (error) {
      notifyError("Something went wrong ! ");
    }
  };
  const onSubmitUpdate: SubmitHandler<Inputs> = async (
    data: any,
    event: any
  ) => {
    console.log("data is here ", data);
    const id = dataRequest._id;
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await UpdateRequest.update(token, data, id);
      if (response.status) {
        reset();
        notifySuccess("Successfully Updated");
        console.log("updated!");
        getListOfRequest();
        setOpenUpdate(false);
      } else {
        notifyError("Something went wrong !");
        console.log("Something Went wrong !");
      }
    } catch (error) {
      console.log("Something Went wrong !");
      notifyError("Something went wrong !");
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleUpdate = (request: any) => {
    setDataRequest(request);
    setOpenUpdate(true);
    console.log("update ! ", request);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getListOfRequest = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await ListRequest.list(token);
      if (response) {
        setListRequest(response);
      } else {
        console.log("Invalid response data:", response);
      }

      console.log(response);
    } catch (error) {}
  };
  useEffect(() => {
    getListOfRequest();
  }, []);

  return (
    <div className=" h-screen">
      <div className="my-10">
        <p className=" font-bold border-2 rounded-md p-5 bg-slate-400 text-white">
          Request Information
        </p>
      </div>
      <div>
        <div className=" flex justify-end mx-40">
          <button
            onClick={handleOpen}
            type="button"
            className="mx-20 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Add Request
          </button>
        </div>
        <div className=" flex justify-center">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 1700,
                height: "100%",
              },
            }}
          >
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
                    {listRequest.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} align="center">
                          No Data Collected
                        </TableCell>
                      </TableRow>
                    ) : (
                      listRequest
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((list: any, index = 0) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index++}
                            >
                              <TableCell>{list.controlNumber}</TableCell>
                              <TableCell>{list.name}</TableCell>
                              <TableCell>{list.year}</TableCell>
                              <TableCell>{list.course}</TableCell>

                              <TableCell>{list.studentId}</TableCell>
                              <TableCell align="right">
                                {list.isOwner}
                              </TableCell>
                              <TableCell align="right">
                                {list.documentationType}
                              </TableCell>
                              <TableCell align="right">
                                {list.noOfCopies}
                              </TableCell>

                              <TableCell align="right">
                                {new Date(list.createdAt).toLocaleString()}
                              </TableCell>
                              <TableCell align="right">
                                <span className=" bg-green-500 px-3 py-1 rounded-md text-white">
                                  {list.status}
                                </span>
                              </TableCell>

                              <TableCell align="right">
                                <div className=" flex gap-2 justify-end">
                                  <button
                                    onClick={() => handleUpdate(list)}
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                  >
                                    Update
                                  </button>

                                  <button
                                    onClick={() => handleDelete(list._id)}
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
                count={listRequest.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </div>
      </div>
      <Modal
        className=" "
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" bg-slate-400 rounded-md py-5"
          >
            <div className=" flex justify-center">
              <p className=" my-5 px-10 p-3  rounded-3xl font-bold text-white bg-slate-500">
                Fill out Information
              </p>
            </div>
            <div className=" flex justify-center">
              <div>
                <p className=" mx-2 mt-3 mb-1">Name</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("name", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.name && <span>This field is required</span>}
                </div>
              </div>
              <div>
                <p className=" mx-2 mt-3 mb-1">Year</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("year", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.year && <span>This field is required</span>}
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
              <div>
                <p className=" mx-2 mt-3 mb-1">Course</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("course", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.course && <span>This field is required</span>}
                </div>
              </div>
              <div>
                <p className=" mx-2 mt-3 mb-1">Address</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("address", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.address && <span>This field is required</span>}
                </div>
              </div>
            </div>
          
            <div className=" flex justify-center">
              <div>
                <p className=" mx-2 mt-3 mb-1">Control No.</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("controlNumber", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.controlNumber && <span>This field is required</span>}
                </div>
              </div>
              <div>
                <p className=" mx-2 mt-3 mb-1">Student ID</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("studentId", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.studentId && <span>This field is required</span>}
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
              <div>
                <p className=" mx-2 mt-3 mb-1">Email Address</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("emailAddress", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.emailAddress && <span>This field is required</span>}
                </div>
              </div>
              <div>
                <p className=" mx-2 mt-3 mb-1">Are you the owner</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("isOwner", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.isOwner && <span>This field is required</span>}
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
              <div>
                <p className=" mx-2 mt-3 mb-1">Document Name </p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("documentationType", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.documentationType && (
                    <span>This field is required</span>
                  )}
                </div>
              </div>
              <div>
                <p className=" mx-2 mt-3 mb-1">No. Copies</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("noOfCopies", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.noOfCopies && <span>This field is required</span>}
                </div>
              </div>

              {/* purpose : string */}
            </div>
            <div className=" flex justify-center">
              <div className="">
                <p className=" mx-2 mt-3 mb-1">Purpose</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("purpose", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.purpose && <span>This field is required</span>}
                </div>
              </div>
            </div>

            <div className=" flex justify-center my-10 mx-2 gap-5">
              {/* <Link href="/"> */}
              <button
                onClick={handleClose}
                className="  hover:bg-green-800 rounded-md bg-green-600 py-3 px-5 text-white"
              >
                Back
              </button>
              {/* </Link> */}
              <button className="  hover:bg-blue-800 rounded-md bg-blue-600 py-3 px-5 text-white">
                Continue
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      {/* modal to update */}
      <Modal
        className=" "
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            onSubmit={handleSubmit(onSubmitUpdate)}
            className=" bg-slate-400 rounded-md py-5"
          >
            <div className=" flex justify-center">
              <p className=" my-5 px-10 p-3  rounded-3xl font-bold text-white bg-green-500">
                Update Information
              </p>
            </div>
            <div className=" flex justify-center">
              <div>
                <p className=" mx-2 mt-3 mb-1">Name</p>
                <input
                  defaultValue={dataRequest.name}
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("name", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.name && <span>This field is required</span>}
                </div>
              </div>
              <div>
                <p className=" mx-2 mt-3 mb-1">Year</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("year", { required: true })}
                  defaultValue={dataRequest.year}

                />
                <div className=" mx-2 text-yellow-500">
                  {errors.year && <span>This field is required</span>}
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
              <div>
                <p className=" mx-2 mt-3 mb-1">Course</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("course", { required: true })}
                  defaultValue={dataRequest.course}

                />
                <div className=" mx-2 text-yellow-500">
                  {errors.course && <span>This field is required</span>}
                </div>
              </div>
              <div>
                <p className=" mx-2 mt-3 mb-1">Address</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("address", { required: true })}
                  defaultValue={dataRequest.address}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.address && <span>This field is required</span>}
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
              <div>
                <p className=" mx-2 mt-3 mb-1">Control No.</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("controlNumber", { required: true })}
                  defaultValue={dataRequest.controlNumber}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.controlNumber && <span>This field is required</span>}
                </div>
              </div>
              <div>
                <p className=" mx-2 mt-3 mb-1">Student ID</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  defaultValue={dataRequest.studentId}
                  {...register("studentId", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.studentId && <span>This field is required</span>}
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
              <div>
                <p className=" mx-2 mt-3 mb-1">Email Address</p>
                <input
                  defaultValue={dataRequest.emailAddress}
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("emailAddress", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.emailAddress && <span>This field is required</span>}
                </div>
              </div>
              <div>
                <p className=" mx-2 mt-3 mb-1">Are you the owner</p>
                <input
                  defaultValue={dataRequest.isOwner}
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("isOwner", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.isOwner && <span>This field is required</span>}
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
              <div>
                <p className=" mx-2 mt-3 mb-1">Document Name</p>
                <input
                  defaultValue={dataRequest.documentationType}
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("documentationType", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.documentationType && (
                    <span>This field is required</span>
                  )}
                </div>
              </div>
              <div>
                <p className=" mx-2 mt-3 mb-1">No. Copies</p>
                <input
                  defaultValue={dataRequest.noOfCopies}
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("noOfCopies", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.noOfCopies && <span>This field is required</span>}
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
            <div>
                <p className=" mx-2 mt-3 mb-1">Purpose</p>
                <input
                  defaultValue={dataRequest.purpose}
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("purpose", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.purpose && <span>This field is required</span>}
                </div>
              </div>
              </div>

            <div className=" flex justify-center my-10 mx-2 gap-5">
              <button
                onClick={handleCloseUpdate}
                className="  hover:bg-green-800 rounded-md bg-green-600 py-3 px-5 text-white"
              >
                Back
              </button>
              <button className="  hover:bg-blue-800 rounded-md bg-blue-600 py-3 px-5 text-white">
                Continue
              </button>
            </div>
          </form>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
}