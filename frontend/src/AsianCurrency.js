import React, { useEffect, useState } from "react";

import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function processData(country, symbol) {
  return { country, symbol };
}
//
function AsianCurrency() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://asia-southeast1-vivid-now-366312.cloudfunctions.net/all_currency",
        {
          crossdomain: true,
        }
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        let tempRow = [];

        let payload = response.data;
        Object.keys(payload).forEach(function (key) {
          tempRow.push(processData(key, payload[key]));
        });
        setRows(tempRow);
      });
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell align="right">Currency Symbol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.country}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.symbol}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default AsianCurrency;
