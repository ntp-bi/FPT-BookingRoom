import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Box, Button, Container, Grid, TextField } from "@mui/material";

import Helmet from "../../components/helmet/Helmet";

import { configPath } from "./../../config/configPath";

import bg from "../../assets/images/login.png";
import user from "../../assets/images/user.png";

import login from "../../api/login";

import "./login.scss";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleInputFocus = (fieldName) => {
        setError((prev) => ({ ...prev, [fieldName]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasErrors = false;
        const newErrors = { ...error };

        if (!credentials.username) {
            hasErrors = true;
            newErrors.username = "Vui lòng nhập username";
        } else {
            newErrors.username = "";
        }

        if (!credentials.password) {
            hasErrors = true;
            newErrors.password = "Vui lòng nhập password";
        } else {
            newErrors.password = "";
        }

        if (hasErrors) {
            setError(newErrors);
            return;
        }

        try {
            const response = await login(credentials);

            if (response.message === "Login success") {
                const token = response.data;
                console.log(token);

                localStorage.setItem("token", token);

                // Giải mã token
                const decoded = jwtDecode(token);
                console.log(decoded);

                // Điều hướng dựa trên role
                if (decoded.roles[0] === "teacher") {
                    navigate(`${configPath.home}`);
                } else {
                    navigate("/admin");
                }
            }
        } catch (error) {
            toast.error("Đăng nhập thất bại!");
            console.error(error);
        }
    };

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
                                            id="username"
                                            label="Email"
                                            variant="outlined"
                                            className="item"
                                            value={credentials.username}
                                            onChange={handleChange}
                                            onFocus={() =>
                                                handleInputFocus("username")
                                            }
                                        />
                                        {error.username && (
                                            <div className="error">{error.username}</div>
                                        )}

                                        <TextField
                                            id="password"
                                            label="Password"
                                            variant="outlined"
                                            className="item"
                                            value={credentials.password}
                                            onChange={handleChange}
                                            onFocus={() =>
                                                handleInputFocus("password")
                                            }
                                        />

                                        {error.password && (
                                            <div className="error">{error.password}</div>
                                        )}
                                    </div>
                                    <Button
                                        variant="contained"
                                        className="button"
                                        onClick={handleSubmit}
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
