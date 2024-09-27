import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, TextField } from "@mui/material";

import { toast } from "react-toastify";

import Helmet from "../../components/helmet/Helmet";

import bg from "../../assets/images/register.png";
import user from "../../assets/images/user.png";

import { configPath } from "../../config/configPath";
import changePassword from "../../api/changePassword";

import "./change-password.scss";

const ChangePassword = () => {
    const [credentials, setCredentials] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const handleFocusInput = (fieldName) => {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    };

    const handleOnChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        const newErrors = { ...errors };

        if (!credentials.oldPassword) {
            hasError = true;
            newErrors.oldPassword = "Vui lòng nhập mật khẩu cũ.";
        }

        if (!credentials.newPassword) {
            hasError = true;
            newErrors.newPassword = "Vui lòng nhập mật khẩu mới.";
        } else if (credentials.newPassword.length < 6) {
            hasError = true;
            newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự.";
        } else if (credentials.newPassword.length > 30) {
            hasError = true;
            newErrors.newPassword = "Mật khẩu mới không được dài hơn 30 ký tự.";
        } else if (credentials.newPassword === credentials.oldPassword) {
            hasError = true;
            newErrors.newPassword = "Mật khẩu mới trùng với mật khẩu cũ.";
        }

        if (!credentials.confirmPassword) {
            hasError = true;
            newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu mới.";
        } else if (credentials.newPassword !== credentials.confirmPassword) {
            hasError = true;
            newErrors.confirmPassword = "Xác nhận mật khẩu không trùng khớp.";
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await changePassword(credentials);

            if (response.message === "Change password success") {
                setCredentials(response);
                toast.success("Thay đổi mật khẩu thành công!");

                setTimeout(() => {
                    navigate(`${configPath.login}`);
                }, 1000);
            }
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                const apiError = error.response.data.message;
                if (apiError === "Incorrect old password") {
                    setErrors({ oldPassword: "Mật khẩu cũ không đúng." });
                } else {
                    setErrors({ global: "Đổi mật khẩu thất bại!" });
                }
            } else {
                setErrors({ global: "Đổi mật khẩu thất bại!" });
            }
            toast.error("Đổi mật khẩu thất bại!");
        }
    };

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
                                            id="oldPassword"
                                            label="Old password"
                                            variant="outlined"
                                            className="item"
                                            value={credentials.oldPassword}
                                            onChange={handleOnChange}
                                            onFocus={() =>
                                                handleFocusInput("oldPassword")
                                            }
                                        />
                                        {errors.oldPassword && (
                                            <div className="error">
                                                {errors.oldPassword}
                                            </div>
                                        )}

                                        <TextField
                                            id="newPassword"
                                            label="New password"
                                            variant="outlined"
                                            className="item"
                                            value={credentials.newPassword}
                                            onChange={handleOnChange}
                                            onFocus={() =>
                                                handleFocusInput("newPassword")
                                            }
                                        />
                                        {errors.newPassword && (
                                            <div className="error">
                                                {errors.newPassword}
                                            </div>
                                        )}

                                        <TextField
                                            id="confirmPassword"
                                            label="Confirm password"
                                            variant="outlined"
                                            className="item"
                                            value={credentials.confirmPassword}
                                            onChange={handleOnChange}
                                            onFocus={() =>
                                                handleFocusInput(
                                                    "confirmPassword"
                                                )
                                            }
                                        />
                                        {errors.confirmPassword && (
                                            <div className="error">
                                                {errors.confirmPassword}
                                            </div>
                                        )}
                                    </div>
                                    <Button
                                        variant="contained"
                                        className="button"
                                        onClick={handleSubmit}
                                    >
                                        Change password
                                    </Button>
                                </div>
                                <p className="back">
                                    <Link to={`${configPath.home}`}>Back</Link>
                                </p>
                            </Grid>
                        </Box>
                    </Grid>
                </Container>
            </div>
        </Helmet>
    );
};

export default ChangePassword;
