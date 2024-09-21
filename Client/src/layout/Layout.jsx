import React from "react";

import Container from "@mui/material/Container";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Router from "../router/Router";

const Layout = () => {
    return (
        <>
            <Header />
            <Router />
            <Footer />
        </>
    );
};

export default Layout;
