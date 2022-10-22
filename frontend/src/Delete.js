import React, { useState } from "react";

import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import qs from "qs";
import Alert from "@mui/material/Alert";
function processData(id, name, gender, email, phone) {
  return { id, name, gender, email, phone };
}

function Delete() {
  const [rows, setRows] = useState([]);
  const [ID, setID] = useState("");
  const [response, setResponse] = useState("");
  function del() {
    axios
      .delete("http://localhost:5000/api/contacts/" + ID, {})
      .then((response) => {
        console.log(response);
        setResponse(response.data);
      });
  }

  function Conditional(props) {
    console.log(props.val);
    if (props.val === "") {
      return;
    }
    if (props.val.status === "success") {
      return <Alert severity="success">{props.val.message}</Alert>;
    } else {
      return <Alert severity="error">{props.val.message}</Alert>;
    }
  }

  return (
    <div>
      <button onClick={del}>Delete Entry</button>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="filled-basic"
          label="Type Id here"
          variant="filled"
          value={ID}
          onChange={(e) => setID(e.target.value)}
        />
      </Box>
      <Conditional val={response} />
    </div>
  );
}
export default Delete;
