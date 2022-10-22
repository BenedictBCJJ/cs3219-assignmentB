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

function processData(id, name, gender, email, phone) {
  return { id, name, gender, email, phone };
}

function GetSingular() {
  const [rows, setRows] = useState([]);
  const [value, setValue] = useState("");
  function get() {
    axios
      .get("http://localhost:5000/api/contacts/" + value, {
        crossdomain: true,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data["data"]._id);
        let tempRow = [];

        let payload = response.data["data"];
        tempRow.push(
          processData(
            payload._id,
            payload.name,
            payload.gender,
            payload.email,
            payload.phone
          )
        );

        setRows(tempRow);
      });
  }
  return (
    <div>
      <button onClick={get}>Get ID</button>
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
          label="Type ID here"
          variant="filled"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.gender}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default GetSingular;
