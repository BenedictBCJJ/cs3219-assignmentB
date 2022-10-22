import React, { useState } from "react";

import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function processData(id, name, gender, email, phone) {
  return { id, name, gender, email, phone };
}

function Quotes() {
  const [rows, setRows] = useState([]);

  function getQuote() {
    axios
      .get("http://localhost:5000/api/contacts", { crossdomain: true })
      .then((response) => {
        console.log(response.data["data"]["0"]._id);
        let tempRow = [];
        for (let i = 0; i < response.data["data"].length; i++) {
          let payload = response.data["data"][i];
          tempRow.push(
            processData(
              payload._id,
              payload.name,
              payload.gender,
              payload.email,
              payload.phone
            )
          );
        }
        setRows(tempRow);
      });
  }
  return (
    <div>
      <button onClick={getQuote}>Get All Contacts</button>
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
export default Quotes;
