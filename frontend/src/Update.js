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
function processData(id, name, gender, email, phone) {
  return { id, name, gender, email, phone };
}

function Update() {
  const [rows, setRows] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [ID, setID] = useState("");

  function update() {
    const data = {
      name: name,
      email: email,
      phone: phone,
      gender: gender,
    };
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: data,
      url: "http://localhost:5000/api/contacts",
    };
    axios
      .put("http://localhost:5000/api/contacts/" + ID, data)
      .then((response) => {
        console.log(response);
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
      <button onClick={update}>Update Entry</button>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "13ch" },
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
        <TextField
          id="filled-basic"
          label="Type Name here"
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Type Email here"
          variant="filled"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Type Phone here"
          variant="filled"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Type Gender here"
          variant="filled"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
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
export default Update;
