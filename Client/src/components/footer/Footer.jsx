import React from "react";
import { Link } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import { configPath } from "../../config/configPath";

import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

import logo from "../../assets/images/fptuniversity.png";

import "./footer.scss";

const Footer = () => {
    return (
        <div className="footer">
            <Container className="container">
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} md={6} lg={5}>
                        <div className="footer__item">
                            <img src={logo} alt="logo" />
                            <p>
                                Tương lai bắt đầu tại đây: Hành trang của sự
                                thành công!
                            </p>
                            <div className="footer__item__icons">
                                <FacebookIcon />
                                <InstagramIcon />
                                <GitHubIcon />
                                <YouTubeIcon />
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={2}>
                        <div className="footer__title">Discover</div>
                        <ul className="footer__content">
                            <li>
                                <Link to={`${configPath.home}`}>Home</Link>
                            </li>
                            <li>
                                <Link to={`${configPath.schedule}`}>
                                    Schedule
                                </Link>
                            </li>
                            <li>
                                <Link to={`${configPath.reservation}`}>
                                    Reservation
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={2}>
                        <div className="footer__title">Discover</div>
                        <ul className="footer__content">
                            <li>
                                <Link to={`${configPath.home}`}>Home</Link>
                            </li>
                            <li>
                                <Link to={`${configPath.schedule}`}>
                                    Schedule
                                </Link>
                            </li>
                            <li>
                                <Link to={`${configPath.reservation}`}>
                                    Reservation
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={3}>
                        <div className="footer__title">Contact</div>
                        <ul className="footer__content">
                            <li>Hotline: 0123456789</li>
                            <li>Email: phuocnt02@gmail.com</li>
                        </ul>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Footer;
