import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import Toaster from 'components/ui/Tostify';
import {useRouter} from 'next/router';

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
    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const router = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();

        console.log(email, password);
        const res = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({name, email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const res2 = await res.json();
        if(res2.error){
            // Error  toster
            Toaster({
                message: res2.error,
                type: 'error',
            })
        }else {
            // success toster
            Toaster({
                message: res2.message,
                type: 'success',
            })

            router.push("/login")
        }

    }

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "email") {
            setemail(value);
        }
        if (name === "password") {
            setpassword(value)
        }
        if (name === "name") {
            setName(value)
        }
    }

    return (

        <Paper style={{ width: "100%", padding: "20px" }}>
            <form className={classes.form} noValidate autoComplete="off" >
                <h2 style={{ textAlign: "center" }}>Signup Form</h2>
                <TextField fullWidth placeholder="name" label="Name" value={name} onChange={onChange} name="name" variant="outlined" />
                <br />
                <br />
                <TextField fullWidth placeholder="Email" label="Email" value={email} onChange={onChange} name="email" variant="outlined" />
                <br />
                <br />
                <TextField type="password" fullWidth placeholder="Password" label="Password" value={password} onChange={onChange} name="password" variant="outlined" />
                <br />
                <br />
                <div style={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                    <Button onClick={onSubmit}>Submit</Button>
                    <Link href="/login"><a>Already have an account?</a></Link>
                </div>
            </form>
        </Paper>

    );
}



