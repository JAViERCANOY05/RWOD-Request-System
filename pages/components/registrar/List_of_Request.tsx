// import * as React from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import Link from "next/link";

// interface Column {
//   id:
//     | "Control Number"
//     | "User ID No"
//     | "Name"
//     | "Course"
//     | "Are you the Owner"
//     | "Relationship of Owner"
//     | "No of Copy"
//     | "Total Amount"
//     | "Date Request"
//     | "Date Payment"
//     | "Reference"
//     | "Proof of Payment"
//     | "Date Releasing"
//     | "Processing Officer"
//     | "Status";
//   label: string;
//   minWidth?: number;
//   align?: "right";
//   format?: (value: number) => string;
// }

// const columns: readonly Column[] = [
//   { id: "Control Number", label: "Control Number", minWidth: 170 },
//   { id: "User ID No", label: "User ID No", minWidth: 100 },
//   {
//     id: "Name",
//     label: "Name",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "Course",
//     label: "Course",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "Are you the Owner",
//     label: "Are you the Owner",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "Relationship of Owner",
//     label: "Relationship of Owner",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "No of Copy",
//     label: "No of Copy",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "Total Amount",
//     label: "Total Amount",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "Date Request",
//     label: "Date Request",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "Date Payment",
//     label: "Date Payment",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "Reference",
//     label: "Reference",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "Proof of Payment",
//     label: "Proof of Payment",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "Date Releasing",
//     label: "Date Releasing",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "Processing Officer",
//     label: "Processing Officer",
//     minWidth: 170,
//     align: "right",
//   },
//   {
//     id: "Status",
//     label: "Status",
//     minWidth: 170,
//     align: "right",
//   },
// ];
// // | "Total Amount"
// // | "Date Request"
// // | "Date Payment"
// // | "Reference"
// // | "Proof of Payment" | "Date Releasing" | "Processing Officer" | "Status" ;
// interface Data {
//   name: string;
//   description: string;
//   action: number;
// }

// function createData(name: string, description: string, action: number): Data {
//   return { name, description, action };
// }

// const rows = [
//   createData("India", "IN", 1324171354),
//   createData("China", "CN", 1403500365),
// ];

// export default function StickyHeadTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   const handleDelete = () => {
//     console.log("delete");
//   };
//   const handleUpdate = () => {
//     console.log("update");
//   };

//   return (
//     <div className=" h-screen">
//       <div className="my-10">
//         <p className=" font-bold border-2 rounded-md p-5 bg-slate-400 text-white">
//           {" "}
//           Courses
//         </p>
//       </div>
//       <Link href="/components/registrar/Add_Course">
//         <button
//           type="button"
//           className="focus:outline-none font-bold  my-10 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//         >
//           Add Course
//         </button>
//       </Link>

//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//         <TableContainer sx={{ maxHeight: 440 }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 {columns.map((column) => (
//                   <TableCell
//                     key={column.id}
//                     align={column.align}
//                     style={{ minWidth: column.minWidth }}
//                   >
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => {
//                   return (
//                     <TableRow
//                       hover
//                       role="checkbox"
//                       tabIndex={-1}
//                       key={index + 1}
//                     >
//                       <TableCell key={index + 1}>{row.name}</TableCell>

//                       <TableCell key={index + 1}>{row.description}</TableCell>

//                       <TableCell key={index + 1} align="right">
//                         <div>
//                           <Link href="/components/registrar/Edit_Course">
//                             <button
//                               // onClick={handleUpdate}
//                               type="button"
//                               className="focus:outline-none font-bold   text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//                             >
//                               Update
//                             </button>
//                           </Link>
//                           <button
//                             onClick={handleDelete}
//                             type="button"
//                             className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </div>
//   );
// }
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "name" | "code" | "population" | "size" | "density" | "1" | "2" | "3";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.density}</TableCell>
                    <TableCell align="right">{row.density}</TableCell>
                    <TableCell align="right">{row.density}</TableCell>
                    <TableCell align="right">{row.density}</TableCell>
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
  );
}
