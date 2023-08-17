import React, { useState, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import { getStudents } from "../controller/api";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
      if (!studentsList) {
        setShowResultEmpty(true);
      }
      setStudentsResult(studentsList);
      setLoading(false);
    }
  };

  function StudentsList({ value }) {
    const lastItem = studentsResult[studentsResult.length - 1];
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: "10px",
            paddingBottom: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
            props.studentProps(value);
            props.goToForm();
          }}
        >
          <div
            style={{
              padding: "20px",
            }}
          >
            <PersonIcon sx={{ color: "#757575" }} fontSize="medium" />
          </div>
          <div style={{ marginTop: "15px" }}>
            <b>
              {value.FirstName} {value.LastName} <br />
            </b>
            <p>{value.SchoolName}</p>
          </div>
          <div style={{ margin: "auto 0 auto auto" }}>
            <IconButton
              aria-label="edit"
              sx={{
                paddingRight: "20px",
                color: "#1976d2",
                fontSize: "medium",
              }}
              onClick={() => {
                props.studentProps(value);
                props.goToForm();
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
        {value !== lastItem && (
          <div
            style={{
              background: "#D3D3D3",
              height: "1.5px",
            }}
          />
        )}
      </>
    );
  }

  return (
    <div
      style={{
        maxWidth: width < 1000 ? "100%" : width < 1500 ? "60%" : "40%",
        backgroundColor: "#f8f5f4",
        marginBottom: "80px",
        margin: "0 auto",
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
              width: "90%",
              justifyContent: "center",
              marginTop: "1%",
              marginBottom: "4%",
              textAlign: "center",
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
              width: "90%",
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
      {studentsResult && (
        <div
          style={{
            width: "100%",
            margin: "auto",
          }}
        >
          <div sx={{ overflow: "auto" }}>
            {studentsResult.map((student) => (
              <StudentsList key={student.Id} value={student} />
            ))}
          </div>
        </div>
      )}
      {showResultEmpty && (
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
      )}
    </div>
  );
}
