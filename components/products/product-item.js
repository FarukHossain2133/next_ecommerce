import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import Dialog from 'components/material/Dialog';
import baseUrl from 'helpers/baseUrl';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import Toaster from 'components/ui/Tostify';
import cookie2 from 'js-cookie';

const useStyles = makeStyles({
    root: {
        maxWidth: "100%",
    },
    media: {
        height: 140,
    },
});

export default function MediaCard({ product, single }) {
    const [quantity, setQuantity] = useState(1);

    const router = useRouter();
    const cookie = parseCookies();
    const user = cookie.user ? JSON.parse(cookie.user) : "";

    const { mediaUrl, name, description, price, _id } = product;
    const classes = useStyles();

    const onConfirmHandler = async () => {
        console.log("confirmed clicked");
        const response = await fetch(baseUrl + "/api/product/" + _id, {
            method: "DELETE"
        });

        const data = await response.json();
        router.push("/")

    }


    const addToCart = async () => {
      const res = await fetch("/api/cart", {
            method: "PUT",
            body: JSON.stringify({quantity, productId: _id}),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookie.token}`
            }
        });

        const res2 = await res.json();
        if(res2.error){
            Toaster({
                message: res2.error,
                type: 'error',
            })

            cookie2.remove("token");
            cookie2.remove("user");
            router2.push("/login")
        }else {
            Toaster({
                message: res2.message,
                type: 'success',
            })

            router.push("/")
        }

        console.log(res2);
    }

    return (
        <Card className={classes.root}>
            <div style={{ textAlign: "center" }}>
                <Image
                    src={mediaUrl}
                    alt={name}
                    width={300}
                    height={140}
                />
            </div>

            <CardActionArea>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ display: "flex", justifyContent: 'space-between' }}>
                {single ?

                    <span>
                        <TextField
                            // id="outlined-basic"
                            label="Quentity"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={quantity}
                            onChange={(e)=>setQuantity(Number(e.target.value))}
                        />
                        {user ?
                            <Button size="small" color="primary" variant="contained" size="medium"
                                onClick={()=>addToCart()}
                            >
                                + ADD
                        </Button>
                            :
                            <Button onClick={()=>router.push("/login")} size="small" color="primary" variant="contained" size="medium">
                                Login to add
                        </Button>
                        }
                    </span> :
                    <Button size="small" color="primary">
                        <Link href={`/product/${_id}`}>
                            Details
                        </Link>
                    </Button>
                }
                {user && user.role !== "user" &&
                    <Dialog
                        onConfirmHandler={onConfirmHandler}
                        title="Are you sure want to delete this product?"
                        body="If yo want to delete this product click Agree button. Else click Disagree"
                    >
                        <Button variant="contained" color="secondary">Delete</Button>
                    </Dialog>
                }

            </CardActions>
        </Card>
    );
}
