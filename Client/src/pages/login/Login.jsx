import React from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";

import Helmet from "../../components/helmet/Helmet";

import bg from "../../assets/images/login.png";
import user from "../../assets/images/user.png";

import "./login.scss";

const Login = () => {
    return (
        <Helmet title="Login">
            <div className="login">
                <Container className="wrapper">
                    <Grid container spacing={2}>
                        <Box bgcolor="#fff" className="login__container">
                            <Grid item lg={7} xs={0}>
                                <img
                                    src={bg}
                                    alt="background"
                                    className="login__container__background"
                                />
                            </Grid>
                            <Grid
                                item
                                lg={5}
                                xs={12}
                                className="login__container__form"
                            >
                                <div className="login__container__form__content">
                                    <img src={user} alt="" />
                                    <h2>Login</h2>
                                    <div className="login__container__form__content__input">
                                        <TextField
                                            id="outlined-basic"
                                            label="Email"
                                            variant="outlined"
                                            className="item"
                                        />

                                        <TextField
                                            id="outlined-basic"
                                            label="Password"
                                            variant="outlined"
                                            className="item"
                                        />
                                    </div>
                                    <Button
                                        variant="contained"
                                        className="button"
                                    >
                                        Login
                                    </Button>
                                </div>
                            </Grid>
                        </Box>
                    </Grid>
                </Container>
            </div>
        </Helmet>
    );
};

export default Login;
