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
import ListRequest from "@/pages/api/list_request";
import { useEffect } from "react";

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
    | "Document Name"
    | "No of Copy"
    // | "Total Amount"
    // | "Date Request"
    // | "Date Payment"
    // | "Reference"
    // | "Proof of Payment"
    // | "Date Releasing"
    // | "Processing Officer"
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
  { id: "User ID No", label: "User ID No", minWidth: 100 },

  // {
  //   id: "Course",
  //   label: "Course",
  //   minWidth: 170,
  //   align: "right",
  // },
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
    id: "Relationship of Owner",
    label: "Relationship of Owner",
    minWidth: 170,
    align: "right",
  },
  // {
  //   id: "Total Amount",
  //   label: "Total Amount",
  //   minWidth: 170,
  //   align: "right",
  // },
  // {
  //   id: "Date Request",
  //   label: "Date Request",
  //   minWidth: 170,
  //   align: "right",
  // },
  // {
  //   id: "Date Payment",
  //   label: "Date Payment",
  //   minWidth: 170,
  //   align: "right",
  // },
  // {
  //   id: "Reference",
  //   label: "Reference",
  //   minWidth: 170,
  //   align: "right",
  // },
  // {
  //   id: "Proof of Payment",
  //   label: "Proof of Payment",
  //   minWidth: 170,
  //   align: "right",
  // },
  // {
  //   id: "Date Releasing",
  //   label: "Date Releasing",
  //   minWidth: 170,
  //   align: "right",
  // },
  // {
  //   id: "Processing Officer",
  //   label: "Processing Officer",
  //   minWidth: 170,
  //   align: "right",
  // },
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
  // const [listRequest, setListRequest] = React.useState({
  //   controlNumber: "",
  //   studentId: "",
  //   emailAddress: "",
  //   isOwner: "",
  //   documentationType: "",
  //   relationshipToOwner: "",
  //   status: "",
  //   noOfCopies: "",
  //   updatedAt: "",
  // });
  const [listRequest, setListRequest] = React.useState([]);

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
      controlNumber: data.controlNo,
      studentId: data.studentID,
      emailAddress: data.emailAddress,
      isOwner: data.areYouTheOwner,
      documentationType: data.documentName,
      noOfCopies: data.noCopies,
      relationshipToOwnwer: data.relationshipToOwnwer,
    };

    const token = localStorage.getItem("token");
    console.log(dataRequest, "data form request ! ");
    try {
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
  const getListOfRequest = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await ListRequest.list(token);
      console.log(response, "99999999");
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
                    {listRequest.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} align="center">
                          <div role="status" className=" flex justify-center">
                            <svg
                              aria-hidden="true"
                              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          </div>
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
                              <TableCell>{list.ownerId}</TableCell>
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
                                <p>wala pa </p>
                              </TableCell>
                              <TableCell align="right">
                                {new Date(list.createdAt).toLocaleString()}
                              </TableCell>
                              <TableCell align="right">
                                <span> {list.status}</span>
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
              {/* <div>
                <p className=" mx-2 mt-3 mb-1 ">Date Request</p>
                <input
                  className=" mx-2 rounded-md py-3 px-10"
                  {...register("dateRequest", { required: true })}
                />
                <div className=" mx-2 text-yellow-500">
                  {errors.dateRequest && <span>This field is required</span>}
                </div>
              </div> */}
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
