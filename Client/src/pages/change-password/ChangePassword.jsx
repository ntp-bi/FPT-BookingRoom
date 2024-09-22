import React from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";

import Helmet from "../../components/helmet/Helmet";

import bg from "../../assets/images/register.png";
import user from "../../assets/images/user.png";

import "./change-password.scss";

const ChangePassword = () => {
    return (
        <Helmet title="Change-password">
            <div className="change-password">
                <Container className="wrapper">
                    <Grid container spacing={2}>
                        <Box
                            bgcolor="#fff"
                            className="change-password__container"
                        >
                            <Grid item lg={7} xs={0}>
                                <img
                                    src={bg}
                                    alt="background"
                                    className="change-password__container__background"
                                />
                            </Grid>
                            <Grid
                                item
                                lg={5}
                                xs={12}
                                className="change-password__container__form"
                            >
                                <div className="change-password__container__form__content">
                                    <img src={user} alt="" />
                                    <h2>Change password</h2>
                                    <div className="change-password__container__form__content__input">
                                        <TextField
                                            id="outlined-basic"
                                            label="Old password"
                                            variant="outlined"
                                            className="item"
                                        />

                                        <TextField
                                            id="outlined-basic"
                                            label="New password"
                                            variant="outlined"
                                            className="item"
                                        />

                                        <TextField
                                            id="outlined-basic"
                                            label="Confirm password"
                                            variant="outlined"
                                            className="item"
                                        />
                                    </div>
                                    <Button
                                        variant="contained"
                                        className="button"
                                    >
                                        Change password
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

export default ChangePassword;
