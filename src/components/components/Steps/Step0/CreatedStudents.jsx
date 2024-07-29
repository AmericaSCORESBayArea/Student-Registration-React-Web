import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const CreatedStudents = ({ studentsList }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Created Students
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="students table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Region</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsList.map((student) => (
              <TableRow key={student.Id}>
                <TableCell>{student.FirstName}</TableCell>
                <TableCell>{student.LastName}</TableCell>
                <TableCell>{student.Region}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CreatedStudents;
