import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Toaster from 'components/ui/Tostify';
import { parseCookies } from 'nookies';

const useStyles = makeStyles((theme) => ({

    form: {
        '& > *': {
            // margin: theme.spacing(1),
            width: '100%',
            // padding: theme.spacing(1),
        },
    },
}));

function SimplePaper() {
    const classes = useStyles();
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [media, setmedia] = useState('');
    const [description, setdescription] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        const mediaUrl = await imageUpload();

        const res = await fetch("/api/products", {
            method: "POST",
            body: JSON.stringify({
                name,
                price,
                description,
                mediaUrl
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const res2 = await res.json();
        console.log(res2);
        if (res2.error) {
            // Error  toster
            Toaster({
                message: res2.error,
                type: 'error',
            })
        } else {
            // success toster
            Toaster({
                message: res2.message,
                type: 'success',
            })
        }

    }


    const imageUpload = async () => {
        const data = new FormData();
        data.append("file", media);
        data.append("upload_preset", "mystore");
        data.append("cloud_name", "duuvxfcio");

        const res = await fetch(`https://api.cloudinary.com/v1_1/duuvxfcio/image/upload`, {
            method: "POST",
            body: data
        });

        const res2 = await res.json();
        // console.log(res2);
        return res2.url;
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
                <h2 style={{ textAlign: "center" }}>Create new product</h2>
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




export async function getServerSideProps(ctx) {
    const cookie = parseCookies(ctx);
    const user = cookie.user ? JSON.parse(cookie.user) : "";
    if (user.role !== "admin") {
        const { res } = ctx;
        res.writeHead(302, { location: "/" }),
            res.end();
    }
 
    return {
        props: {}
    }
}


export default SimplePaper;