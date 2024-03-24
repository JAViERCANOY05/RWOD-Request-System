import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import GetAllRequest from "@/pages/api/getAllRequest";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import DeleteRequest from "@/pages/api/deleteRequest";
import {
  notifyError,
  notifySuccess,
  notifySuccess2,
} from "@/pages/Notifications";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Request from "../../api/approveRequest";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import VIewTable from "../helper/viewTable";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
};

interface Column {
  id:
    | "Control Number"
    | "User ID No"
    | "Are you the Owner"
    | "No of Copy"
    | "Date Request"
    | "Action"
    | "Amount"
    | "Reciept"
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
    id: "Are you the Owner",
    label: "Are you the Owner",
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
    id: "Amount",
    label: "Amount",
    minWidth: 170,
    align: "right",
  },
  {
    id: "Reciept",
    label: "Reciept",
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

export default function StickyHeadTable() {
  const [dataRequest, setDataRequest] = React.useState({
    _id: "",
    name: "",
    address: "",
    year: "",
    course: "",
    amount: 0,
    // _id: "",
    // controlNumber: "",
    // studentId: "",
    // isOwner: "",
    documentationType: "",
    // noOfCopies: "",
    // emailAddress: "",
    // purpose: "",
    ownerId: 0,
    controlNumber: 0,
    studentId: 0,
    purpose: 123,
    emailAddress: "",
    isOwner: "",
    status: "",
    paymentMethod: "",
    noOfCopies: 0,
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = (data: any) => {
    setDataRequest(data);
    // console.log(data)
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [listOfRequest, setListOfRequest] = React.useState([]);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteUser = async (id: any) => {
    console.log(id, "hah");
    try {
      const token = localStorage.getItem("token");
      const responseData = await DeleteRequest.delete(token, id);
      if (responseData.status) {
        getListOfRequest();
        notifySuccess("Request deleted!");
        console.log("already deleted!");
      }
    } catch (error) {
      notifyError("Something went Wrong!");
      console.log("something went wrong!");
    }
  };
  const getListOfRequest = async () => {
    try {
      const token = localStorage.getItem("token");
      const responseData = await GetAllRequest.getRequest(token);
      console.log(responseData);
      if (responseData.status) {
        setListOfRequest(responseData.response);
      } else {
        console.log("something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const approve = async (id : any ) =>
  // {

  //   try {
  //     const token = localStorage.getItem("token")
  //     const response = await Request.approved(token , id)
  //     if(response.status)
  //     {
  //        getListOfRequest();
  //       notifySuccess("Request Approved ! ");
  //       console.log("goods na ")
  //     }
  //     else
  //     {
  //       console.log("error")
  //     }

  //   } catch (error) {
  //     console.log("error")

  //   }

  // }
  useEffect(() => {
    getListOfRequest();
  }, []);

  const handleUpdate = async (id: any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await Request.approvePayment(token, id);
      if (response.status) {
        setInputValue1("");
        setInputValue("");
        setOpen(false);
        getListOfRequest();
        notifySuccess2("Payment Approved ! ");
        console.log("goods na ");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error");
    }
  };

  const [inputValue, setInputValue] = React.useState("");
  const [inputValue1, setInputValue1] = React.useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = {
      amount: inputValue,
      name: inputValue1,
    };
    console.log("bad ", data);

    try {
      const token = localStorage.getItem("token");
      const response = await Request.approved(token, dataRequest._id, data);
      if (response.status) {
        setInputValue1("");
        setInputValue("");
        setOpen(false);
        getListOfRequest();
        notifySuccess("Request Approved ! ");
        console.log("goods na ");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <div className="my-10">
        <p className=" font-bold border-2 rounded-md p-5 bg-slate-400 text-white">
          All Request
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
                  {listOfRequest.length === 0 ? (
                    <TableCell align="center" colSpan={7}>
                      <CircularProgress />
                    </TableCell>
                  ) : (
                    listOfRequest
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((list: any, index) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell>{list.controlNumber}</TableCell>
                          <TableCell>{list.studentId}</TableCell>
                          <TableCell align="right">{list.isOwner}</TableCell>
                          <TableCell align="right">{list.noOfCopies}</TableCell>
                          <TableCell align="right">
                            {new Date(list.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                              }
                            )}
                          </TableCell>
                          {/* <TableCell align="right">{list.status}</TableCell> */}
                          <TableCell align="right">
                            <p
                              className={
                                list.status === "approve"
                                  ? "complete bg-green-500 text-center text-white rounded-lg"
                                  : list.status === "waiting for approval" // Adjusted condition for waiting for approval
                                  ? "pending bg-blue-700 text-center text-white rounded-lg" // Blue for waiting for approval
                                  : list.status === "waiting for payment"
                                  ? "pending bg-blue-700 text-center text-white rounded-lg" // Blue for waiting for payment
                                  : list.status === "pending"
                                  ? "pending bg-yellow-500 text-center text-white rounded-lg"
                                  : "" // Add default class or empty string if none of the conditions match
                              }
                            >
                              {list.status}
                            </p>
                          </TableCell>
                          <TableCell align="right">
                            {!list.amount
                              ? null
                              : new Intl.NumberFormat("en-US").format(
                                  parseFloat(list.amount)
                                )}
                          </TableCell>
                          <TableCell align="right">
                            {!list.image ? null : (
                              <VIewTable imageUrl={list.image} />
                            )}
                          </TableCell>

                          <TableCell align="right">
                            <div>
                              {list.status === "approve" ||
                              list.status === "waiting for approval" ||
                              list.status === "pending" ? (
                                <>
                                  <button
                                    onClick={() => handleDeleteUser(list._id)}
                                    type="button"
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                  >
                                    Delete
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleUpdate(list._id)}
                                    type="button"
                                    className="focus:outline-none font-bold text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                  >
                                    Approve Payment
                                  </button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={listOfRequest.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          {/* </Paper> */}
        </Box>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <p className=" text-center font-bold my-5 border-">Payment Info</p>
            <div>
              <div className="flex justify-center items-center ">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="inputValue"
                    >
                      Name
                    </label>
                    <input
                      id="inputValue1"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Name"
                      value={inputValue1}
                      onChange={(event) => setInputValue1(event.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="inputValue"
                    >
                      Amount
                    </label>
                    <input
                      id="inputValue"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      placeholder="Enter value"
                      value={inputValue}
                      onChange={(event) => setInputValue(event.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Box>
        </Modal>
      </div>

      <ToastContainer />
    </div>
  );
}
