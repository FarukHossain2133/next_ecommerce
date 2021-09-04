import { Typography } from '@material-ui/core';
import React from 'react';
import classes from './footer.module.css';

const Footer = () => {
    return (
        <>
            <br />
            <div className={classes.footer}>

                <Typography variant="body2">For contact with developer send direct email</Typography>
                {/* <br/> */}
                <a target="_blank" href="mailto:fa905432@gmail.com">
                    Send Email to Delveloper
                </a>
            </div>
        </>
    )
}

export default Footer
