import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {parseCookies} from 'nookies';
import { Typography } from '@material-ui/core';
// import baseUrl from 'helpers/baseUrl';

const useStyles = makeStyles({
  table: {
    minWidth: "100%",
  },
});


export default function BasicTable() {
  const classes = useStyles();
  const [users, setusers] = useState()

  const {token} = parseCookies();
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
      const res =  await fetch("/api/users", {
        headers: {
            "Authorization": "Bearer " + token
        }
        });
        const res2 = await res.json();
        setusers(res2);
  }

  return (
    <TableContainer component={Paper}>
        <Typography variant="h6" style={{textAlign:"center"}}>Users roles</Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> ID</TableCell>
            <TableCell align="center">name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">role</TableCell>
            <TableCell align="center">Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
