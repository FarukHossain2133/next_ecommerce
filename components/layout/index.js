import React, { Fragment } from 'react'
import Footer from './footer'
import Header from './header'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const Layout = ({ children }) => {
    return (
        <Fragment>
            <Header />
            <CssBaseline />
            <br/>
            <Container  maxWidth="sm">
                {children}
            </Container>
            <Footer />
        </Fragment>
    )
}

export default Layout
