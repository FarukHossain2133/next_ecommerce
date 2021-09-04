import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
  },
});


export default function BasicTable({orders}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
        <Typography variant="h6" style={{textAlign:"center"}}>Orders history list</Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>product ID</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Created </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.total}</TableCell>
              <TableCell align="right">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
