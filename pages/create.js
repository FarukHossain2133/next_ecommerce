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
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [media, setmedia] = useState('');
    const [description, setdescription] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        console.log(name, price);
        const user = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({ name, price }),
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
        if (name === "name") {
            setname(value);
        }
        if (name === "price") {
            setprice(value)
        }

        // if (name === "media") {
        //     setmedia(value)
        // }
        if (name === "description") {
            setdescription(value)
        }
    }


    const onChangeFile = (e) => {
        setmedia(e.target.files[0])
    }


    console.log(name, price, media, description);
    return (

        <Paper style={{ width: "100%", padding: "20px" }}>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={onSubmit} >
                <h2 style={{ textAlign: "center" }}>Signup Form</h2>
                <TextField
                    fullWidth
                    placeholder="name"
                    label="name"
                    value={name}
                    onChange={onChange}
                    name="name"
                    variant="outlined"
                />
                <br />
                <br />
                <TextField
                    fullWidth
                    placeholder="price"
                    label="price"
                    value={price}
                    onChange={onChange}
                    name="price"
                    variant="outlined"
                />
                <br />
                <br />

                <TextField
                    fullWidth
                    placeholder="media"
                    // label="media"
                    // value={media}
                    onChange={onChangeFile}
                    name="media"
                    type="file"
                    variant="outlined"
                />
                {media && 
                <img
                    style={{ width: "100px", height: "100px" }}
                    src={URL.createObjectURL(media)}
                />
            }
                <br />
                <br />
                <TextField
                    fullWidth
                    placeholder="description"
                    label="description"
                    value={description}
                    onChange={onChange}
                    name="description"
                    variant="outlined"
                />
                <br />
                <br />
                <Button type="submit">Submit</Button>
            </form>
        </Paper>

    );
}



