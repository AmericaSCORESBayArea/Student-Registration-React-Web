import React from "react";
import { Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const CreatedStudents = ({ studentsList }) => {
  const rows = studentsList.map((student) => ({
    id: student.Id,
    firstName: student.FirstName,
    lastName: student.LastName,
    birthdate: student.Birthdate,
    grade: student.Grade,
    region: student.Region,
    incompleteRecord: student.IncompleteRecord === "true",
    waiver: student.IncompleteRecord === "true",
  }));

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "birthdate", headerName: "Birthdate", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    {
      field: "incompleteRecord",
      headerName: "Is Record Complete",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <CancelIcon color="error" />
        ) : (
          <CheckCircleIcon color="success" />
        ),
    },
    {
      field: "waiver",
      headerName: "Waiver",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <CancelIcon color="error" />
        ) : (
          <CheckCircleIcon color="success" />
        ),
    },
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
