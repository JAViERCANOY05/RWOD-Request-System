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

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import { eventNames } from "process";
import RequestForm from "@/pages/api/request_form";

type Inputs = {
  controlNo: string;
  studentID: string;
  emailAddress: string;
  areYouTheOwner: string;
  documentName: string;
  noCopies: string;
  dateRequest: string;
  relationshipToOwnwer: string;
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
    | "Status"
    | "Action";

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
  {
    id: "Action",
    label: "Action",
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
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
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

  const onSubmit: SubmitHandler<Inputs> = async (data: any, event: any) => {
    console.log("data is here ", data);
    event.preventDefault();

    const dataRequest = {
      controlNo: data.controlNo,
      studentID: data.studentID,
      emailAddress: data.emailAddress,
      areYouTheOwner: data.areYouTheOwner,
      documentName: data.documentName,
      noCopies: data.noCopies,
      dateRequest: data.dateRequest,
      relationshipToOwnwer: data.relationshipToOwnwer,
    };
    const token = localStorage.getItem("token");

    console.log(dataRequest, "data form request ! ", "token", token);

    try {
      const response = await RequestForm.request(dataRequest, token);
      console.log(response, " hhehe");
      if (response.message === "Add succesfully") {
        notifySuccess(response.meesage);
        reset();
        setOpen(false);
      } else {
        console.log("error ");
      }
    } catch (error) {
      notifyError("Something went wrong ! ");
      console.log(error);
    }
  };

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
          Request Information
        </p>
      </div>
      <div>
        <button
          onClick={handleOpen}
          type="button"
          className="mx-20 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add Request
        </button>
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
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
                            <TableCell align="right">
                              <div className=" flex gap-2">
                                <button
                                  type="button"
                                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                  Update
                                </button>

                                <button
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
            {/* </Paper> */}
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
                <p className=" mx-2 mt-3 mb-1">Control No.</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("controlNo", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.controlNo && <span>This field is required</span>}
                </div>
              </div>
              <div>
                <p className=" mx-2 mt-3 mb-1">Student ID</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("studentID", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.studentID && <span>This field is required</span>}
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
                  {...register("areYouTheOwner", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.areYouTheOwner && <span>This field is required</span>}
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
              <div>
                <p className=" mx-2 mt-3 mb-1">Document Name</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("documentName", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.documentName && <span>This field is required</span>}
                </div>
              </div>
              <div>
                <p className=" mx-2 mt-3 mb-1">Relastionship to the owner</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("relationshipToOwnwer", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.relationshipToOwnwer && (
                    <span>This field is required</span>
                  )}
                </div>
              </div>
            </div>
            <div className=" flex justify-center">
              <div>
                <p className=" mx-2 mt-3 mb-1">No. Copies</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("noCopies", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.noCopies && <span>This field is required</span>}
                </div>
              </div>
              <div>
                <p className=" mx-2 mt-3 mb-1 ">Date Request</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("dateRequest", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.dateRequest && <span>This field is required</span>}
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
      <ToastContainer />
    </div>
  );
}
