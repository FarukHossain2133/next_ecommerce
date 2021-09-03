import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const cookies = parseCookies();
    const router = useRouter();

    const user = cookies.user ? JSON.parse(cookies.user) : "";

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link href="/">
                            E-commerce
                        </Link>
                    </Typography>
                    <div style={{ marginLeft: "auto" }}>


                        <Button color="inherit">
                            <Link href="/cart">
                                Cart
                            </Link>
                        </Button>

                        {user && user.role !== "user" &&
                            <Button color="inherit">
                                <Link href="/create">
                                    Create
                                </Link>
                            </Button>
                        }
                        {user ?
                            <>
                                <Button color="inherit">
                                    <Link href="/account">
                                        Account
                                    </Link>
                                </Button>
                                <Button color="inherit" onClick={() => {
                                    cookie.remove("token");
                                    cookie.remove("user");
                                    router.push("/login")
                                }}>
                                    Logout
                                </Button>
                            </>
                            :
                            <>
                                <Button color="inherit">
                                    <Link href="/login">
                                        Login
                                    </Link>
                                </Button>
                                <Button color="inherit">
                                    <Link href="/signup">
                                        Signup
                                    </Link>
                                </Button>
                            </>
                        }


                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
