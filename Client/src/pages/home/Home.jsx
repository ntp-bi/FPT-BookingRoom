import React from "react";
import { Container } from "@mui/material";

import Helmet from "../../components/helmet/Helmet";
import HeroSlider from "../../components/hero-slider/HeroSlider";
import SectionHeading from "../../components/section-heading/SectionHeading";

import "./home.scss";

const Home = () => {
    return (
        <Helmet title="Home">
            <div className="home">
                <div className="main">
                    <Container className="container">
                        <HeroSlider />                        
                    </Container>
                </div>
            </div>
        </Helmet>
    );
};

export default Home;
