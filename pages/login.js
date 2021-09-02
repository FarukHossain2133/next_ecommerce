import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({


    form: {
        '& > *': {
            // margin: theme.spacing(1),
            width: '100%',
            // padding: theme.spacing(1),
        },
    },
}));

export default function SimplePaper() {
    const classes = useStyles();

    return (

        <Paper style={{ width: "100%", padding: "20px" }}>
            <form className={classes.form} noValidate autoComplete="off">
                <h2 style={{textAlign:"center"}}>Login Form</h2>
                <TextField fullWidth placeholder="Email" label="Email" variant="outlined" />
                <br />
                <br />
                <TextField fullWidth placeholder="Password" label="Password" variant="outlined" />
                <br />
                <br />
                <Button>Submit</Button>
            </form>
        </Paper>


    );
}



