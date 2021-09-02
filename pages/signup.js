import React, { useState } from 'react';
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
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        console.log(email, password);
        const user = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await user.json();
        console.log(data);

    }

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name === "email"){
            setemail(value);
        }
        if(name === "password"){
            setpassword(value)
        }
    }

    return (

        <Paper style={{ width: "100%", padding: "20px" }}>
            <form className={classes.form} noValidate autoComplete="off" >
                <h2 style={{ textAlign: "center" }}>Signup Form</h2>
                <TextField fullWidth placeholder="Email" label="Email" value={email} onChange={onChange} name="email" variant="outlined" />
                <br />
                <br />
                <TextField fullWidth placeholder="Password" label="Password" value={password} onChange={onChange} name="password" variant="outlined" />
                <br />
                <br />
                <Button onClick={onSubmit}>Submit</Button>
            </form>
        </Paper>

    );
}



