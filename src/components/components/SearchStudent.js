import React, { useState, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import { getStudents } from "../controller/api";
import CircularProgress from "@mui/material/CircularProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ErrorModal } from "../utils/Modal";
import Grid from "@mui/material/Grid";
import moment from "moment";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function SearchStudent(props) {
  const [showResultEmpty, setShowResultEmpty] = useState(false);
  const [value, setValue] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const [loading, setLoading] = useState(false);
  const [studentsResult, setStudentsResult] = useState();
  const searchStudent = async (student) => {
    setStudentsResult();
    if (loading !== true) {
      setLoading(true);
      setShowResultEmpty(false);
      let studentsList = await getStudents(student);
      if (studentsList.length === 0) {
        setShowResultEmpty(true);
      }
      setStudentsResult(studentsList);
      setLoading(false);
    }
  };

  const rows = [studentsResult];

  return (
    <div
      style={{
        maxWidth: width < 1000 ? "100%" : width < 1500 ? "60%" : "40%",
        backgroundColor: "#f8f5f4",
        marginBottom: "80px",
        margin: "auto",
        marginTop: "30px",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        lg={6}
        sm={12}
        sx={{
          flex: 1,
          backgroundColor: "#f8f5f4",
          display: "flex",
          justifyContent: "center",
          marginX: "auto",
          padding: "20px",
          marginTop: "30px",
        }}
      >
        <div>
          <IconButton color="primary" onClick={() => props.goBack()}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#f8f5f4",
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <div
            title={props.props.title}
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              marginTop: "1%",
              marginBottom: "4%",
              textAlign: "left",
            }}
          >
            <h5>{props.props.title}</h5>
          </div>
          <Paper
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1%",
              marginBottom: "4%",
              textAlign: "center",
              width: "95%",
            }}
          >
            <InputBase
              readOnly={loading}
              sx={{ ml: 1, flex: 1 }}
              placeholder={props.props.inputPlaceholder}
              inputProps={{
                "aria-label": props.props.inputProps,
                maxLength: 35,
              }}
              onInput={(e) => {
                if (e.target.value.length !== 0) {
                  setValue(e.target.value);
                }
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (e.target.value.length !== 0) {
                    searchStudent(e.target.value);
                  }
                }
              }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={() => {
                if (value.length > 0) {
                  searchStudent(value);
                }
              }}
            >
              {loading === true ? (
                <CircularProgress size={24} />
              ) : (
                <SearchIcon />
              )}
            </IconButton>
          </Paper>
        </div>
      </Grid>
      {studentsResult !== undefined && studentsResult.length > 0 ? (
        <div
          style={{
            maxWidth: width < 1000 ? "400px" : "600px",
            margin: "auto",
            marginBottom: "30px",
            padding: 10,
          }}
        >
          {/* <Grid container>
            <Grid item xs={12} md={6} lg={6} sm={12} sx={{ flex: 1 }}> */}
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    {props.props.tableOptions.actions}
                  </TableCell>
                  <TableCell align="center">
                    {props.props.tableOptions.firstName}
                  </TableCell>
                  <TableCell align="center">
                    {props.props.tableOptions.lastName}
                  </TableCell>
                  <TableCell align="center" type="date">
                    {props.props.tableOptions.birthdate}
                  </TableCell>
                  <TableCell align="center">
                    {props.props.tableOptions.schoolName}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows[0].map((row) => (
                  <TableRow key={row.Id}>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            props.studentProps(row);
                            props.goToForm();
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => ErrorModal(props.props, "error")}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">{row.FirstName}</TableCell>
                    <TableCell align="center">{row.LastName}</TableCell>
                    <TableCell align="center">
                      {row.Birthdate.length > 0
                        ? moment(row.Birthdate).format("MM-DD-YYYY")
                        : ""}
                    </TableCell>
                    <TableCell align="center">{row.SchoolName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* </Grid>
          </Grid> */}
        </div>
      ) : null}
      {showResultEmpty ? (
        <div
          style={{
            maxWidth: "80%",
            margin: "auto",
            marginBottom: "80px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SearchOffIcon sx={{ fontSize: 50 }} />
          <h6>{props.empty}</h6>
        </div>
      ) : null}
    </div>
  );
}
