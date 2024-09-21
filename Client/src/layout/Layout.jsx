import React from "react";

import Container from "@mui/material/Container";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Router from "../router/Router";

const Layout = () => {
    return (
        <>
            <Header />
            <Container sx={{ maxWidth: "1300px !important" }}>
                <Router />
            </Container>
            <Footer />
        </>
    );
};

export default Layout;
