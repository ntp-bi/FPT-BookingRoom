import React from "react";

import { Container } from "@mui/material";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Router from "../router/Router";

const Layout = () => {
    return (
        <Container sx={{ maxWidth: "1356px !important" }}>
            <Header />
            <Router />
            <Footer />
        </Container>
    );
};

export default Layout;
