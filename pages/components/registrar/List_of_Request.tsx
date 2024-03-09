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
import { notifyError, notifySuccess } from "@/pages/Notifications";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

interface Column {
  id:
    | "Control Number"
    | "User ID No"
    // | "Name"
    // | "Course"
    | "Are you the Owner"
    // | "Relationship of Owner"
    | "No of Copy"
    // | "Total Amount"
    | "Date Request"
    // | "Date Payment"
    // | "Reference"
    // | "Proof of Payment"
    // | "Date Releasing"
    | "Action"
    // | "Processing Officer"
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

  useEffect(() => {
    getListOfRequest();
  }, []);

  const handleUpdate = () => {
    notifyError("Under Coding!");
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

                            {new Date(list.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}
                          </TableCell>
                          {/* <TableCell align="right">{list.status}</TableCell> */}
                          <TableCell align="right">
                            <p
                              className={
                                list.status === "complete"
                                  ? "complete bg-green-500  text-center text-white rounded-lg"
                                  : "pending bg-blue-700 text-center text-white rounded-lg"
                              }
                            >
                              {list.status}
                            </p>
                          </TableCell>
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
                                onClick={() => handleDeleteUser(list._id)}
                                type="button"
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                              >
                                Delete
                              </button>
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
      <ToastContainer />
    </div>
  );
}
