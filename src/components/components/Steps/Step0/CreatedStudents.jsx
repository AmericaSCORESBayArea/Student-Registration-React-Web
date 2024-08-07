// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
// } from "@mui/material";

// const CreatedStudents = ({ studentsList }) => {
//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Created Students
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table aria-label="students table">
//           <TableHead>
//             <TableRow>
//               <TableCell>First Name</TableCell>
//               <TableCell>Last Name</TableCell>
//               <TableCell>Birthdate</TableCell>
//               <TableCell>Grade</TableCell>
//               <TableCell>Region</TableCell>
//               <TableCell>Incomplete Record</TableCell>
//               <TableCell>Wavier</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {studentsList.map((student) => (
//               <TableRow key={student.Id}>
//                 <TableCell>{student.FirstName}</TableCell>
//                 <TableCell>{student.LastName}</TableCell>
//                 <TableCell>{student.Birthdate}</TableCell>
//                 <TableCell>{student.Grade}</TableCell>
//                 <TableCell>{student.Region}</TableCell>
//                 <TableCell>{student.IncompleteRecord}</TableCell>
//                 <TableCell>{student.LiabilityWaiver}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default CreatedStudents;

import React from "react";
import { Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CreatedStudents = ({ studentsList }) => {
  // Map students data to format required by DataGrid
  const rows = studentsList.map((student) => ({
    id: student.Id, // DataGrid requires a unique 'id' field
    firstName: student.FirstName,
    lastName: student.LastName,
    birthdate: student.Birthdate,
    grade: student.Grade,
    region: student.Region,
    incompleteRecord: student.IncompleteRecord ? "No" : "Yes",
    waiver: student.LiabilityWaiver ? "Signed" : "Not Signed",
  }));
  console.log("row", rows);
  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "birthdate", headerName: "Birthdate", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    { field: "incompleteRecord", headerName: "Is Record Complete", flex: 1 },
    { field: "waiver", headerName: "Waiver", flex: 1 },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Created Students
      </Typography>
      <Paper style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </Paper>
    </div>
  );
};

export default CreatedStudents;
